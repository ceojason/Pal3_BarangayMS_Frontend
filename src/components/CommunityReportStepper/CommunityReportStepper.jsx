import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import MainStepper from '../base/MainStepper/MainStepper';
import StepperContants from '../../../contants/StepperContants';
import CommunityReportFilePanel from '../../components/CommunityReportFilePanel/CommunityReportFilePanel';
import CommunityReportViewPanel from '../../components/CommunityReportViewPanel/CommunityReportViewPanel';

class CommunityReportStepper extends Component {
  constructor(props) {
    super(props);
  }

  onClickBack = isAckPage => {
    const { CommunityReportStore } = this.context.store;

    if (!isAckPage) {
      CommunityReportStore.validatedData = null;
      CommunityReportStore.currentStep = StepperContants.MANUAL_ENROLL_CREATE;
    }else{
      CommunityReportStore.reset();
      CommunityReportStore.validatedData = null;
      CommunityReportStore.savedData = null;
      CommunityReportStore.currentStep = StepperContants.MANUAL_ENROLL_CREATE;
    }
  };

  render() {
    const { CommunityReportStore } = this.context.store;
    const { isAdd, header, subHeader, icon } = this.props;

    const data = [
      {
        key: StepperContants.MANUAL_ENROLL_CREATE,
        content: (
          <CommunityReportFilePanel 
            isAdd={isAdd} 
            header={header}
            subHeader={subHeader}
            icon={icon}
          />
        )
      },
      {
        key: StepperContants.MANUAL_ENROLL__CONFIRM,
        content: (
          <CommunityReportViewPanel
            currentStep={2}
            totalSteps={3}
            isConfirm={true}
            header={header + ' Confirmation'}
            subHeader={subHeader}
            data={CommunityReportStore.validatedData}
            onClickBack={() => this.onClickBack(false)}
            icon={icon}
          />
        )
      },
      {
        key: StepperContants.MANUAL_ENROLL__ACK,
        content: (
          <CommunityReportViewPanel
            currentStep={3}
            totalSteps={3}
            isAck={true}
            data={CommunityReportStore.savedData}
            onClickBack={() => this.onClickBack(true)}
            hasHeader={true}
            ackMessage={CommunityReportStore.ackHeader.ackMessage}
            refNo={CommunityReportStore.ackHeader.refNo}
            icon={icon}
            isCommunityReport={true}
            isResident={true}
          />
        )
      }
    ];

    return (
      <MainStepper
        showStepperMap={false}
        data={data}
        activeKey={CommunityReportStore.currentStep}
      />
    );
  }
};

CommunityReportStepper.contextType = StoreContext;

export default observer(CommunityReportStepper);
