import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import InquiryPanel from '../base/InquiryPanel/InquiryPanel';
import InquiryTable from '../base/InquiryTable/InquiryTable';
import BaseHyperlink from '../base/BaseHyperlink/BaseHyperlink';
import BaseButton from '../base/BaseButton/BaseButton';
import SearchFilterUtils from '../../utils/SearchFilterUtils';
import StepperContants from '../../../contants/StepperContants';
import BaseColumnWithSubData from '../base/BaseColumnWithSubData/BaseColumnWithSubData';

class SearchUsersPanel extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.onSearch();
  };

  onClickLink = data => {
    const { UsersStore, SettingsStore } = this.context.store;

    UsersStore.inquiryData=[];
    SettingsStore.isInitialSearch = true;

    UsersStore.viewData=data;
    UsersStore.searchStep = StepperContants.INQUIRY_VIEW;
  };

  getDataCols = () => {
    return [
      {
        name: 'USER ID',
        index: 'cd',
        cell: data => (
          <BaseHyperlink value={data.cd} onClick={() => this.onClickLink(data)} />
        )
      },
      {
        name: 'NAME',
        index: 'fullNm',
        sortBy: 'firstNm',
        width: '290px',
        cell: data => (
          <BaseColumnWithSubData data={data.fullNm} subData={data.statusString} className={data.status===1 ? 'is_green' : 'is_red'} />
        )
      },
      {
        name: 'PHONE NUMBER',
        index: 'mobileNo',
        sortBy: 'mobileNo'
      },
      {
        name: 'HOME ADDRESS',
        index: 'homeAddress',
        sortBy: 'homeAddress'
      },
      {
        name: 'PUROK #',
        index: 'phaseString'
      },
      // {
      //   name: 'Date Enrolled',
      //   index: 'dateEnrolledString'
      // },
      {
        name: '',
        index: null,
        cell: data => (
          <div className="actionbtns_ctr">
            <BaseButton
              customClassName="btn_update"
              onClick={() => this.onClickUpdate(data)}
              label="Update"
              hasIcon
              icon={<i className="bi bi-pencil-square"></i>}
            />
            <BaseButton
              customClassName="btn_delete"
              onClick={() => this.showDeleteModal(data)}
              label="Delete"
              hasIcon
              icon={<i className="bi bi-trash"></i>}
            />
          </div>
        )
      }
    ];
  };

  onSearch = () => {
    const { UsersStore, SettingsStore } = this.context.store;

    let searchFilter = SearchFilterUtils.getSearchFilterObject(
      UsersStore.searchFields
    );

    let multiSort = {
      sortBy: 'first_nm',
      direction: 'ASC'
    };

    let pagination = { page: 0, size: 10 };

    const requestObj = {
      ...searchFilter,
      ...multiSort,
      ...pagination
    };
    
    UsersStore.searchUsers(requestObj).then(data => {
      UsersStore.inquiryData = data;
      SettingsStore.isInitialSearch = false;
    });
  };

  onReset = () => {
    const { UsersStore } = this.context.store;
    UsersStore.resetInquiry(true);
  };

  render() {
    const { UsersStore, SettingsStore } = this.context.store;

    return (
      <InquiryPanel
        header={'Search Users'}
        subHeader={'Manager, update, and track users information here.'}
        hasSearchFilter={true}
        columns={this.getDataCols()}
        fileTitle="Users Report"
        fileName="Users_Report.pdf"
        data={UsersStore.inquiryData}
        onSearch={() => this.onSearch()}
        onReset={() => this.onReset()}
        hasDivider={true}
        filterList={UsersStore.searchFields}
        hasDownload={true}>
        <InquiryTable
          data={UsersStore.inquiryData}
          columns={this.getDataCols()}
        />
      </InquiryPanel>
    );
  };
};

SearchUsersPanel.contextType = StoreContext;

export default observer(SearchUsersPanel);
