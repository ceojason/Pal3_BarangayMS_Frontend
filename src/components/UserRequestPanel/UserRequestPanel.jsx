import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import InquiryPanel from '../base/InquiryPanel/InquiryPanel';
import InquiryTable from '../base/InquiryTable/InquiryTable';
import SearchFilterUtils from '../../utils/SearchFilterUtils';
import BaseHyperlink from '../base/BaseHyperlink/BaseHyperlink';
import MessageModal from '../base/MessageModal/MessageModal';
import StepperContants from '../../../contants/StepperContants';
import { buildClassNames } from '../../utils/ClassUtils';

class UserRequestPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalContent: ''
    };
  }

  componentDidMount() {
    this.onSearch();
  };

  onSearch = () => {
    const { UserRequestStore, SettingsStore } = this.context.store;
    const { isPending } = this.props;
    SettingsStore.isLoading=true;

    let searchFilter = SearchFilterUtils.getSearchFilterObject(
      UserRequestStore.searchFields
    );

    searchFilter.isPending = isPending;

    let multiSort = {
      sortBy: 'date_requested',
      direction: 'DESC'
    };

    let pagination = { page: 0, size: 10 };

    const requestObj = {
      ...searchFilter,
      ...multiSort,
      ...pagination
    };
    
    UserRequestStore.searchRequest(requestObj).then(data => {
      SettingsStore.isLoading=false;
      UserRequestStore.inquiryData = data;
      SettingsStore.isInitialSearch = false;
    });
  };

  onClickLink = data => {
    const { UserRequestStore, SettingsStore } = this.context.store;

    UserRequestStore.inquiryData=[];
    SettingsStore.isInitialSearch = true;

    UserRequestStore.viewData=data;
    UserRequestStore.searchStep = StepperContants.INQUIRY_VIEW;
  };

  getDataCols = () => {
    return [
      {
        name: 'REFERENCE NUMBER',
        index: 'refNo',
        cell: data => (
          <BaseHyperlink value={data.refNo} onClick={() => this.onClickLink(data)} customClassName={'add_width'} />
        )
      },
      {
        name: 'DOCUMENT TYPE',
        index: 'documentTypeString',
        sortBy: 'documentTypeString'
      },
      {
        name: 'REQUESTOR',
        index: 'requestor',
        sortBy: 'requestor'
      },
      {
        name: 'DATE REQUESTED',
        index: 'dateRequestedString'
      },
      // {
      //   name: 'PURPOSE',
      //   index: 'purpose',
      //   sortBy: 'purpose',
      //   cell: data => (
      //     <span
      //       className='clickable_message_modal'
      //       onClick={() => this.openModal(data.purpose)}>
      //         {data.purpose.length > 20 ? data.purpose.substring(0, 25) + '...' : data.purpose}
      //     </span>
      //   )
      // }
      {
        name: 'STATUS',
        index: 'statusString',
        cell: data => (
          <span className={buildClassNames('status_column', data.status === 9 ? 'success_status_col' : data.status === 10 ? 'rejected_status_col' : 'pending_status_col')}>
            {data.statusString}
          </span>
        )
      }
    ];
  };

   onReset = () => {
    const { UserRequestStore } = this.context.store;
    UserRequestStore.resetInquiry(true);
  };

  openModal = (content) => {
    this.setState({ showModal: true, modalContent: content });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalContent: '' });
  };

  render() {
    const { header, subHeader } = this.props;
    const { UserRequestStore } = this.context.store;

    return (
      <Fragment>
        <InquiryPanel
          header={header}
          subHeader={subHeader}
          hasSearchFilter={true}
          columns={this.getDataCols()}
          fileTitle="User Request Report"
          fileName="User_Request_Report.pdf"
          data={UserRequestStore.inquiryData}
          onSearch={() => this.onSearch()}
          onReset={() => this.onReset()}
          hasDivider={true}
          icon={<i class="bi bi-file-earmark-post"></i>}
          filterList={UserRequestStore.searchFields}
          hasDownload={true}>
            <InquiryTable
              data={UserRequestStore.inquiryData}
              columns={this.getDataCols()}
            />
        </InquiryPanel>
        <MessageModal
          show={this.state.showModal}
          content={this.state.modalContent}
          onClose={this.closeModal}
        />
      </Fragment>
    );
  }
};

UserRequestPanel.contextType = StoreContext;

export default observer(UserRequestPanel);
