import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import MainStepper from '../base/MainStepper/MainStepper';
import StepperContants from '../../../contants/StepperContants';
import AddAdminForm from '../../components/AddAdminForm/AddAdminForm';
import AdminEnrollView from '../../components/AdminEnrollView/AdminEnrollView';

class AddAdminStepper extends Component {
  constructor(props) {
    super(props);
  }

  onClickBack = () => {

  };

  render() {
    const { AdminEnrollmentStore } = this.context.store;
    const { isAdd } = this.props;

    let data=[
      {
        key: StepperContants.MANUAL_ENROLL_CREATE,
        content: (
          <AddAdminForm
            isAdd={isAdd}
          />
        ),
        stepperLabel: 'Basic information'
      },
      {
        key: StepperContants.MANUAL_ENROLL__CONFIRM,
        content: (
          <AdminEnrollView
            isAdd={isAdd}
            data={AdminEnrollmentStore.validatedData}
            isConfirm={true}
            onClickBack={() => this.onClickBack()}
            currentStep={2}
            totalSteps={3}
          />
        ),
        stepperLabel: 'Verify system administrator information'
      },
      {
        key: StepperContants.MANUAL_ENROLL__ACK,
        content: (
          <AdminEnrollView
            isAdd={isAdd}
            data={AdminEnrollmentStore.savedData}
            isAck={true}
            ackMessage={AdminEnrollmentStore.ackHeader.ackMessage}
            refNo={AdminEnrollmentStore.ackHeader.refNo}
            onClickBack={() => this.onClickBack(true)}
            hasHeader={true}
          />
        ),
        stepperLabel: 'Success!'
      },
    ];

    return (
      <Fragment>
        <MainStepper data={data} activeKey={AdminEnrollmentStore.currentStep} />
      </Fragment>
    );
  }
};

AddAdminStepper.contextType = StoreContext;

export default observer(AddAdminStepper);
