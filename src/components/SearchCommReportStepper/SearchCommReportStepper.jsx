import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import MainStepper from '../base/MainStepper/MainStepper';
import StepperContants from '../../../contants/StepperContants';
import SearchCommReports from '../../components/SearchCommReports/SearchCommReports';
import CommunityReportViewPanel from '../CommunityReportViewPanel/CommunityReportViewPanel';

class SearchCommReportStepper extends Component {
  constructor(props) {
    super(props);
  }

  onClickBack = () => {
    const { CommunityReportStore } = this.context.store;

    CommunityReportStore.viewData=null;
    CommunityReportStore.searchStep = StepperContants.INQUIRY_INITIAL;
  };

  render() {
    const { CommunityReportStore } = this.context.store;
    const { header, subHeader } = this.props;

    const data = [
      {
        key: StepperContants.INQUIRY_INITIAL,
        content: (
          <SearchCommReports
            header={header}
            subHeader={subHeader}
          />
        )
      },
      {
        key: StepperContants.INQUIRY_VIEW,
        content: (
          <CommunityReportViewPanel
            header={header}
            subHeader={subHeader}
            data={CommunityReportStore.viewData}
            onClickBack={() => this.onClickBack()}
            currentStep={1}
            totalSteps={1}
            isAdmin={true}
          />
        )
      }
    ];

    return (
      <Fragment>
        <MainStepper
          isInquiry={true}
          data={data}
          activeKey={CommunityReportStore.searchStep}
        />
      </Fragment>
    );
  }
};

SearchCommReportStepper.contextType = StoreContext;

export default observer(SearchCommReportStepper);
