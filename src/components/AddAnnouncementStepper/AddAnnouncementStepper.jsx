import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import MainStepper from '../base/MainStepper/MainStepper';
import StepperContants from '../../../contants/StepperContants';
import AddAnnouncementPanel from '../../components/AddAnnouncementPanel/AddAnnouncementPanel';
import AnnouncementViewPanel from '../../components/AnnouncementViewPanel/AnnouncementViewPanel';

class AddAnnouncementStepper extends Component {
  constructor(props) {
    super(props);
  }

  onClickBack = isAck => {
    const { AnnouncementStore } = this.context.store;

    if (!isAck) {
      AnnouncementStore.validatedData = null;
      AnnouncementStore.currentStep = StepperContants.MANUAL_ENROLL_CREATE;
    }else{
      AnnouncementStore.reset();
      AnnouncementStore.validatedData = null;
      AnnouncementStore.savedData = null;
      AnnouncementStore.currentStep = StepperContants.MANUAL_ENROLL_CREATE;
    }
  };

  render() {
    const { AnnouncementStore } = this.context.store;
    const { isAdd, header, subHeader } = this.props;

    const data = [
      {
        key: StepperContants.MANUAL_ENROLL_CREATE,
        content: (
          <AddAnnouncementPanel
            isAdd={isAdd}
            header={header}
            subHeader={subHeader}
          />
        )
      },
      {
        key: StepperContants.MANUAL_ENROLL__CONFIRM,
        content: (
          <AnnouncementViewPanel
            currentStep={2}
            totalSteps={3}
            isConfirm={true}
            header={header + ' Confirmation'}
            subHeader={subHeader}
            data={AnnouncementStore.validatedData}
            onClickBack={() => this.onClickBack(false)}
          />
        )
      },
      {
        key: StepperContants.MANUAL_ENROLL__ACK,
        content: (
          <AnnouncementViewPanel
            currentStep={3}
            totalSteps={3}
            isAck={true}
            data={AnnouncementStore.savedData}
            onClickBack={() => this.onClickBack(true)}
            hasHeader={true}
            ackMessage={AnnouncementStore.ackHeader.ackMessage}
            refNo={AnnouncementStore.ackHeader.refNo}
            isAnnouncement={true}
          />
        )
      }
    ];

    return (
      <Fragment>
        <MainStepper showStepperMap={false} data={data} activeKey={AnnouncementStore.currentStep} />
      </Fragment>
    );
  }
};

AddAnnouncementStepper.contextType = StoreContext;

export default observer(AddAnnouncementStepper);
