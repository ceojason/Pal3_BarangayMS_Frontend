import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import InquiryPanel from '../base/InquiryPanel/InquiryPanel';
import InquiryTable from '../base/InquiryTable/InquiryTable';
import BaseHyperlink from '../base/BaseHyperlink/BaseHyperlink';
import SearchFilterUtils from '../../utils/SearchFilterUtils';
import StatusColumn from '../StatusColumn/StatusColumn';
import StepperContants from '../../../contants/StepperContants';

class SearchCommReports extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.onSearch();
  };

  onClickLink = data => {
    const { CommunityReportStore, SettingsStore } = this.context.store;

    CommunityReportStore.inquiryData=[];
    SettingsStore.isInitialSearch = true;

    CommunityReportStore.viewData=data;
    CommunityReportStore.searchStep = StepperContants.INQUIRY_VIEW;
  };

  onSearch = () => {
    const { CommunityReportStore, SettingsStore, SessionStore } = this.context.store;
    const { isPending, isUser } = this.props;
    SettingsStore.isLoading=true;

    let searchFilter = SearchFilterUtils.getSearchFilterObject(
      CommunityReportStore.searchFields
    );

    searchFilter.isPending = isPending;
    searchFilter.isUser = isUser;
    searchFilter.userId = isUser ? SessionStore.currentUser.userId : null;

    let multiSort = {
      sortBy: 'created_dt',
      direction: 'DESC'
    };

    let pagination = { page: 0, size: 10 };

    const requestObj = {
      ...searchFilter,
      ...multiSort,
      ...pagination
    };
    
    CommunityReportStore.searchRequest(requestObj).then(data => {
      SettingsStore.isLoading=false;
      CommunityReportStore.inquiryData = data;
      SettingsStore.isInitialSearch = false;
    });
  };

  getDataCols = () => {
    const { isUser } = this.props;
    let cols = [];

    cols.push({
      name: 'REFERENCE NUMBER',
      index: 'refNo',
      cell: data => (
        <BaseHyperlink value={data.refNo} onClick={() => this.onClickLink(data)} customClassName={'add_width'} />
      )
    });

    cols.push({
      name: 'DOCUMENT TYPE',
      index: 'reportTypeKeyString',
      sortBy: 'reportTypeKeyString'
    });

    cols.push({
      name: 'REPORTER',
      index: 'reporter'
    });

    cols.push({
      name: 'CREATED DATE',
      index: 'createdDtString'
    });

    cols.push({
      name: 'UPDATED DATE',
      index: 'updatedDtString'
    });

    // cols.push({
    //   name: 'DATE PROCESSED',
    //   index: 'dateProcessedString'
    // });

    cols.push({
      name: 'STATUS',
      index: 'statusString',
      cell: data => (
        // <span className={buildClassNames('status_column', data.status === 9 ? 'success_status_col' : data.status === 10 ? 'rejected_status_col' : 'pending_status_col')}>
        //   {data.statusString}
        // </span>
        <StatusColumn statusKey={data.status} />
      )
    });

    return cols;
  };

  onReset = () => {
    const { CommunityReportStore } = this.context.store;
    CommunityReportStore.resetInquiry(true);
  };

  render() {
    const { header, subHeader } = this.props;
    const { CommunityReportStore } = this.context.store;

    return (
      <Fragment>
        <InquiryPanel
          header={header}
          subHeader={subHeader}
          hasSearchFilter={true}
          columns={this.getDataCols()}
          fileTitle="Community Reports"
          fileName="Community_Reports.pdf"
          data={CommunityReportStore.inquiryData}
          onSearch={() => this.onSearch()}
          onReset={() => this.onReset()}
          hasDivider={true}
          // icon={<i class="bi bi-file-earmark-post"></i>}
          filterList={CommunityReportStore.searchFields}
          hasDownload={true}>
          <InquiryTable
            data={CommunityReportStore.inquiryData}
            columns={this.getDataCols()}
          />
        </InquiryPanel>
      </Fragment>
    );
  }
};

SearchCommReports.contextType = StoreContext;

export default observer(SearchCommReports);
