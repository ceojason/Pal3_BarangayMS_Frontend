import React, { Component, Fragment } from 'react';
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
    this.state={
      processedDelete: false
    };
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
        index: 'refNo',
        cell: data => (
          <BaseHyperlink value={data.refNo} onClick={() => this.onClickLink(data)} customClassName={'add_width'} />
        )
      },
      {
        name: 'NAME',
        index: 'fullNm',
        sortBy: 'lastNm',
        width: '290px',
        cell: data => (
          <BaseColumnWithSubData data={data.fullNm} subData={data.statusString} className={data.status===1 ? 'is_green' : 'is_red'} />
        )
      },
      // {
      //   name: 'PHONE NUMBER',
      //   index: 'mobileNo',
      //   sortBy: 'mobileNo'
      // },
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
              onClick={() => this.onClickReset(data)}
              label="Reset"
              hasIcon
              icon={<i class="bi bi-arrow-clockwise"></i>}
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

  onClickReset = data => {
    const { SettingsStore, UsersStore } = this.context.store;
    
    SettingsStore.showModal({
      type: 'update',
      headerTitle: 'Reset User Credentials',
      valueToDisplay: data.fullNm,
      data: data,
      additionalBtn: (data, closeModal) => (
        <BaseButton
          customClassName="btn_update"
          label="Reset"
          onClick={() => this.onResetUser(data, closeModal)}
        />
      )
    });
  };

  onResetUser = (data, closeModal) => {
    const { SettingsStore, UsersStore } = this.context.store;

    window.scrollTo(0, 0);
    UsersStore.resetUser(data, res => {
      SettingsStore.showSuccessPanel = true;
      SettingsStore.successMsg = {
        ackMessage: res.ackMessage
      };
      setTimeout(() => {
        SettingsStore.showSuccessPanel = false;
        SettingsStore.successMsg = {};
      }, 10000);
    }, error => {
      SettingsStore.showErrorPanel = true;
      SettingsStore.errorList = error;
      setTimeout(() => {
        SettingsStore.showErrorPanel = false;
        SettingsStore.errorList = [];
      }, 10000);
    });
    this.onSearch();
    closeModal && closeModal();
  };

  showDeleteModal = (data) => {
    const { SettingsStore } = this.context.store;

    SettingsStore.showModal({
      type: 'delete',
      headerTitle: 'Delete Confirmation',
      valueToDisplay: data.fullNm,
      data: data,
      additionalBtn: (data, closeModal) => (
        <BaseButton
          customClassName="btn_delete"
          label="Delete"
          onClick={() => this.onClickDelete(data, closeModal)}
        />
      )
    });
  };

  onClickDelete = (data, closeModal) => {
    const { UsersStore, SettingsStore } = this.context.store;

    closeModal && closeModal();
    UsersStore.deleteUser(
      data.id,
      res => {
        this.setState({
          processedDelete: true
        }, () => {
          this.onSearch();
        });
        setTimeout(() => this.setState({ processedDelete: false }), 10000);
      },
      err => {
        setTimeout(() => {
          SettingsStore.showModal({
            type: 'error',
            headerTitle: 'Transaction could not be processed.',
            errorList: err
          });
        }, 150);
      }
    );
  };

  onSearch = () => {
    const { UsersStore, SettingsStore } = this.context.store;
    SettingsStore.isLoading=true;

    let searchFilter = SearchFilterUtils.getSearchFilterObject(
      UsersStore.searchFields
    );

    let multiSort = {
      sortBy: 'last_nm',
      direction: 'ASC'
    };

    let pagination = { page: 0, size: 10 };

    const requestObj = {
      ...searchFilter,
      ...multiSort,
      ...pagination
    };
    
    UsersStore.searchUsers(requestObj).then(data => {
      SettingsStore.isLoading=false;
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
      <Fragment>
        {this.state.processedDelete && (
          <div className='my_profile_changes_saved_banner'>
            <span><i class="bi bi-check-circle-fill"></i>{'User has been successfully deleted.'}</span>
          </div>
        )}

        {SettingsStore.showSuccessPanel && (
          <div className='my_profile_changes_saved_banner'>
            <span><i class="bi bi-check-circle-fill"></i>{SettingsStore.successMsg.ackMessage}</span>
          </div>
        )}
        {SettingsStore.showErrorPanel && (
          <div className='my_profile_changes_error_banner'>
            <span><i class="bi bi-exclamation-circle-fill"></i>{SettingsStore.errorList[0]}</span>
          </div>
        )}

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
          icon={<i className="bi bi-search"></i>}
          hasDownload={true}>
          <InquiryTable
            data={UsersStore.inquiryData}
            columns={this.getDataCols()}
          />
        </InquiryPanel>
      </Fragment>
    );
  };
};

SearchUsersPanel.contextType = StoreContext;

export default observer(SearchUsersPanel);
