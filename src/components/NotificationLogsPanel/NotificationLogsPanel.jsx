import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import InquiryPanel from '../base/InquiryPanel/InquiryPanel';
import InquiryTable from '../base/InquiryTable/InquiryTable';
import SearchFilterUtils from '../../utils/SearchFilterUtils';
import BaseHyperlink from '../base/BaseHyperlink/BaseHyperlink';
import BaseButton from '../base/BaseButton/BaseButton';
import BaseColumnWithSubData from '../base/BaseColumnWithSubData/BaseColumnWithSubData';

class NotificationLogsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalContent: ''
    };
  };

  componentDidMount() {
    this.onSearch();
  };

  onSearch = () => {
    const { NotificationLogsStore, SettingsStore } = this.context.store;

    let searchFilter = SearchFilterUtils.getSearchFilterObject(
      NotificationLogsStore.searchFields
    );

    let multiSort = {
      sortBy: 'sent_dt',
      direction: 'DESC'
    };

    let pagination = { page: 0, size: 10 };

    const requestObj = {
      ...searchFilter,
      ...multiSort,
      ...pagination
    };
    
    NotificationLogsStore.searchNotifLogs(requestObj).then(data => {
      NotificationLogsStore.inquiryData = data;
      SettingsStore.isInitialSearch = false;
    });
  };

  getDataCols = () => {
    return [
      {
        name: 'REFERENCE NUMBER',
        index: 'refNo',
        cell: data => (
          <BaseHyperlink value={data.refNo} customClassName={'add_width'} />
        )
      },
      {
        name: 'TYPE',
        index: 'typeString',
        sortBy: 'typeString'
      },
      {
        name: 'RECIPIENT',
        index: 'recipient',
        sortBy: 'recipient'
      },
      {
        name: 'CHANNEL',
        index: 'isSmsEmailString'
      },
      {
        name: 'SENT DATE',
        index: 'sentDtString'
      },
      {
        name: 'MESSAGE',
        index: 'message',
        sortBy: 'message',
        cell: data => (
          <span
            className='clickable_message_modal'
            onClick={() => this.openModal(data.message)}>
              {data.message.length > 25 ? data.message.substring(0, 25) + '...' : data.message}
          </span>
        )
      }
    ];
  };

  openModal = (content) => {
    this.setState({ showModal: true, modalContent: content });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalContent: '' });
  };

  onReset = () => {
    const { NotificationLogsStore } = this.context.store;
    NotificationLogsStore.resetInquiry(true);
  };

  render() {
    const { NotificationLogsStore } = this.context.store;

    return (
      <Fragment>
        <InquiryPanel
          header={'Notification Logs'}
          subHeader={'View, resend, and manage sent user notification through this module.'}
          hasSearchFilter={true}
          columns={this.getDataCols()}
          fileTitle="Notification Logs Report"
          fileName="Notification_Logs.pdf"
          data={NotificationLogsStore.inquiryData}
          onSearch={() => this.onSearch()}
          onReset={() => this.onReset()}
          hasDivider={true}
          filterList={NotificationLogsStore.searchFields}
          hasDownload={true}>
            <InquiryTable
              data={NotificationLogsStore.inquiryData}
              columns={this.getDataCols()}
            />
        </InquiryPanel>


        {this.state.showModal && (
          <div
            className='message_modal'>
            <div
              className='message_modal_body'>
              <h3><i class="bi bi-envelope-check-fill"></i>Message Details</h3>
              <p><i class="bi bi-caret-right-fill"></i>{this.state.modalContent}</p>
              <button onClick={this.closeModal}>Close</button>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
};

NotificationLogsPanel.contextType = StoreContext;

export default observer(NotificationLogsPanel);
