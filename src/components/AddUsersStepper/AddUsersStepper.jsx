import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import StepperContants from '../../../contants/StepperContants';
import AddUsersPanel from '../../components/AddUsersPanel/AddUsersPanel';
import UsersViewPanel from '../../components/UsersViewPanel/UsersViewPanel';
import MainStepper from '../base/MainStepper/MainStepper';

class AddUsersStepper extends Component {
  constructor(props) {
    super(props);
  }

  onClickBack = isAckPage => {
    const { UsersStore, SettingsStore } = this.context.store;
    const { isAdd } = this.props;

    if (!isAckPage) {
      if (isAdd) {
        UsersStore.validatedData = null;
        UsersStore.currentStep = StepperContants.MANUAL_ENROLL_CREATE;
      } else {
        if (UsersStore.currentStep==StepperContants.MANUAL_ENROLL__CONFIRM) {
          UsersStore.searchStep = StepperContants.MANUAL_ENROLL_CREATE;
          UsersStore.currentStep = StepperContants.MANUAL_ENROLL_CREATE;
        }else{
          UsersStore.enrollmentRequest = {};
          UsersStore.searchStep = StepperContants.INQUIRY_INITIAL;
          UsersStore.currentStep = StepperContants.INQUIRY_INITIAL;
        }
      }
    }else{
      UsersStore.reset();
      UsersStore.validatedData = null;
      UsersStore.savedData = null;

      if (isAdd) {
        UsersStore.currentStep = StepperContants.MANUAL_ENROLL_CREATE;
      }else{
        SettingsStore.showSuccessPanel=false;
        UsersStore.enrollmentRequest = {};
        UsersStore.searchStep = StepperContants.INQUIRY_INITIAL;
        UsersStore.currentStep = StepperContants.INQUIRY_INITIAL;
      }
    }
  };

  render() {
    const { UsersStore } = this.context.store;
    const { isAdd, header, subHeader, icon } = this.props;

    const data = [
      {
        key: StepperContants.MANUAL_ENROLL_CREATE,
        content: (
          <AddUsersPanel
            isAdd={isAdd} 
            header={isAdd ? header : 'Update Resident Details'}
            subHeader={subHeader}
            icon={icon}
            onClickBack={!isAdd ? () => this.onClickBack() : null}
          />
        )
      },
      {
        key: StepperContants.MANUAL_ENROLL__CONFIRM,
        content: (
          <UsersViewPanel
            currentStep={2}
            totalSteps={3}
            isConfirm={true}
            header={isAdd ? header + ' Confirmation' : 'Update Resident Details' + ' Confirmation'}
            subHeader={subHeader}
            data={UsersStore.validatedData}
            onClickBack={() => this.onClickBack(false)}
            icon={icon}
            isAdd={isAdd} 
          />
        )
      },
      {
        key: StepperContants.MANUAL_ENROLL__ACK,
        content: (
          <UsersViewPanel
            currentStep={3}
            totalSteps={3}
            isAck={true}
            data={UsersStore.savedData}
            onClickBack={() => this.onClickBack(true)}
            hasHeader={true}
            ackMessage={UsersStore.ackHeader.ackMessage}
            refNo={UsersStore.ackHeader.refNo}
            isUser={true}
            icon={icon}
            isAdd={isAdd} 
            hideBackToDashboardBtn={!isAdd}
          />
        )
      }
    ];

    return (
      <Fragment>
        <MainStepper showStepperMap={false} data={data} activeKey={UsersStore.currentStep} />
      </Fragment>
    );
  }
};

AddUsersStepper.contextType = StoreContext;

export default observer(AddUsersStepper);
