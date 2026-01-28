import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import MainStepper from '../base/MainStepper/MainStepper';
import StepperContants from '../../../contants/StepperContants';
import DocumentRequestPanel from '../../components/DocumentRequestPanel/DocumentRequestPanel';
import DocumentRequestView from '../../components/DocumentRequestView/DocumentRequestView';

class DocumentRequestStepper extends Component {
  constructor(props) {
    super(props);
  }

  onClickBack = isAckPage => {
    const { DocumentStore } = this.context.store;

    if (!isAckPage) {
      DocumentStore.validatedData = null;
      DocumentStore.currentStep = StepperContants.MANUAL_ENROLL_CREATE;
    }else{
      DocumentStore.reset();
      DocumentStore.validatedData = null;
      DocumentStore.savedData = null;
      DocumentStore.currentStep = StepperContants.MANUAL_ENROLL_CREATE;
    }
  };

  render() {
    const { DocumentStore } = this.context.store;
    const { isAdd, header, subHeader, icon } = this.props;

    const data = [
      {
        key: StepperContants.MANUAL_ENROLL_CREATE,
        content: (
          <DocumentRequestPanel
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
          <DocumentRequestView
            currentStep={2}
            totalSteps={3}
            isConfirm={true}
            header={header + ' Confirmation'}
            subHeader={subHeader}
            data={DocumentStore.validatedData}
            onClickBack={() => this.onClickBack(false)}
            icon={icon}
          />
        )
      },
      {
        key: StepperContants.MANUAL_ENROLL__ACK,
        content: (
          <DocumentRequestView
            currentStep={3}
            totalSteps={3}
            isAck={true}
            data={DocumentStore.savedData}
            onClickBack={() => this.onClickBack(true)}
            hasHeader={true}
            ackMessage={DocumentStore.ackHeader.ackMessage}
            refNo={DocumentStore.ackHeader.refNo}
            icon={icon}
            isDocumentRequest={true}
          />
        )
      }
    ];

    return (
      <Fragment>
        <MainStepper
          showStepperMap={false}
          data={data}
          activeKey={DocumentStore.currentStep}
        />
      </Fragment>
    );
  }
};

DocumentRequestStepper.contextType = StoreContext;

export default observer(DocumentRequestStepper);
