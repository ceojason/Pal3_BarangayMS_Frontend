import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import InquiryPanel from '../base/InquiryPanel/InquiryPanel';
import InquiryTable from '../base/InquiryTable/InquiryTable';
import BaseHyperlink from '../base/BaseHyperlink/BaseHyperlink';
import BaseColumnWithSubData from '../base/BaseColumnWithSubData/BaseColumnWithSubData';
import BaseButton from '../base/BaseButton/BaseButton';
import SearchFilterUtils from '../../utils/SearchFilterUtils';
import StatusColumn from '../StatusColumn/StatusColumn';
import StepperContants from '../../../contants/StepperContants';

class SearchHouseholdPanel extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.onSearch();
  };

  onClickLink = data => {
    const { HouseholdStore, SettingsStore } = this.context.store;

    HouseholdStore.inquiryData=[];
    SettingsStore.isInitialSearch = true;

    HouseholdStore.viewData=data;
    HouseholdStore.searchStep = StepperContants.INQUIRY_VIEW;
  };

  getDataCols = () => {
    return [
      {
        name: 'HOUSEHOLD',
        index: 'householdDesc',
        width: '30%',
        cell: data => (
          <BaseHyperlink value={data.householdDesc} onClick={() => this.onClickLink(data)} customClassName={'add_width'} />
        )
      },
      {
        name: 'HOUSEHOLD HEAD',
        index: 'fullNm',
        sortBy: 'lastNm',
        // width: '290px',
        cell: data => (
          data!=null && data.householdHead!=null ? <BaseColumnWithSubData data={data.householdHead} subData={data.userStatusString} className={data.userStatus===1 ? 'is_green' : 'is_red'} /> : 'N/A'
        )
      },
      // {
      //   name: 'HOME ADDRESS',
      //   index: 'homeAddress',
      //   sortBy: 'homeAddress',
      //   width: '30%',
      // },
      {
        name: 'MEMBER COUNT',
        index: 'memberCount',
      },
      {
        name: 'STATUS',
        index: 'statusString',
        cell: data => (
          // <span className={buildClassNames('status_column', data.status === 9 ? 'success_status_col' : data.status === 10 ? 'rejected_status_col' : 'pending_status_col')}>
          //   {data.statusString}
          // </span>
          <StatusColumn statusKey={data.status} />
        )
      }
      // {
      //   name: '',
      //   index: null,
      //   cell: data => (
      //     <div className="actionbtns_ctr">
      //       <BaseButton
      //         customClassName="btn_update"
      //         onClick={() => this.onClickReset(data)}
      //         label="Reset"
      //         hasIcon
      //         icon={<i class="bi bi-arrow-clockwise"></i>}
      //       />
      //       <BaseButton
      //         customClassName="btn_delete"
      //         onClick={() => this.showDeleteModal(data)}
      //         label="Delete"
      //         hasIcon
      //         icon={<i className="bi bi-trash"></i>}
      //       />
      //     </div>
      //   )
      // }
    ];
  };

  onSearch = () => {
    const { HouseholdStore, SettingsStore } = this.context.store;
    SettingsStore.isLoading=true;

    let searchFilter = SearchFilterUtils.getSearchFilterObject(
      HouseholdStore.searchFields
    );

    let multiSort = {
      sortBy: 'household_desc',
      direction: 'ASC'
    };

    let pagination = { page: 0, size: 10 };

    const requestObj = {
      ...searchFilter,
      ...multiSort,
      ...pagination
    };
    
    HouseholdStore.search(requestObj).then(data => {
      SettingsStore.isLoading=false;
      HouseholdStore.inquiryData = data;
      SettingsStore.isInitialSearch = false;
    });
  };

  onReset = () => {
    const { HouseholdStore } = this.context.store;
    HouseholdStore.resetInquiry(true);
  };

  render() {
    const { HouseholdStore } = this.context.store;

    return (
      <Fragment>
        <InquiryPanel
          header={'Search Household'}
          subHeader={'Manager, update, and track household information here.'}
          hasSearchFilter={true}
          columns={this.getDataCols()}
          fileTitle="Household Report"
          fileName="Household_Report.pdf"
          data={HouseholdStore.inquiryData}
          onSearch={() => this.onSearch()}
          onReset={() => this.onReset()}
          hasDivider={true}
          filterList={HouseholdStore.searchFields}
          // icon={<i className="bi bi-search"></i>}
          hasDownload={true}>
            <InquiryTable 
              data={HouseholdStore.inquiryData}
              columns={this.getDataCols()}
            />
        </InquiryPanel>
      </Fragment>
    );
  }
};

SearchHouseholdPanel.contextType = StoreContext;

export default observer(SearchHouseholdPanel);
