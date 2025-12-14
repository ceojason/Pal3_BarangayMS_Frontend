import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import MainStepper from '../base/MainStepper/MainStepper';
import StepperContants from '../../../contants/StepperContants';
import StudentEnrollmentForm from '../StudentEnrollmentForm/StudentEnrollmentForm';
import StudentEnrollmentForm2 from '../StudentEnrollmentForm2/StudentEnrollmentForm2';
import StudentEnrollmentView from '../StudentEnrollmentView/StudentEnrollmentView';

class AddStudentStepper extends Component {
  constructor(props) {
    super(props);
  }

  onClickBack = isAckPage => {
    const { StudentEnrollmentStore } = this.context.store;

    if (!isAckPage) {
      StudentEnrollmentStore.enrollmentRequest.hasEnrolledSubjects=false;
      StudentEnrollmentStore.currentStep=StepperContants.MANUAL_ENROLL_CREATE2;
    }else{
      StudentEnrollmentStore.reset();
      StudentEnrollmentStore.enrollmentRequest.hasEnrolledSubjects=false;
      StudentEnrollmentStore.currentStep=StepperContants.MANUAL_ENROLL_CREATE;
    }
  };

  render() {
    const { StudentEnrollmentStore } = this.context.store;
    const { isAdd } = this.props;

    let data = [
      {
        key: StepperContants.MANUAL_ENROLL_CREATE,
        content: (
          <StudentEnrollmentForm 
            isAdd={isAdd}
          />
        ),
        stepperLabel: 'Basic information'
      },
      {
        key: StepperContants.MANUAL_ENROLL_CREATE2,
        content: (
          <StudentEnrollmentForm2
            isAdd={isAdd}
            data={StudentEnrollmentStore.validatedData}
            onClickBack={() => this.onClickBack(false)}
          />
        ),
        stepperLabel: 'Enroll subjects and LRN'
      },
      {
        key: StepperContants.MANUAL_ENROLL__CONFIRM,
        content: (
          <StudentEnrollmentView
            isAdd={isAdd}
            data={StudentEnrollmentStore.validatedData}
            isConfirm={true}
            onClickBack={() => this.onClickBack(false)}
          />
        ),
        stepperLabel: 'Verify student information'
      },
      {
        key: StepperContants.MANUAL_ENROLL__ACK,
        content: (
          <StudentEnrollmentView
            isAdd={isAdd}
            data={StudentEnrollmentStore.savedData}
            isAck={true}
            ackMessage={StudentEnrollmentStore.ackHeader.ackMessage}
            refNo={StudentEnrollmentStore.ackHeader.refNo}
            onClickBack={() => this.onClickBack(true)}
            hasHeader={true}
          />
        ),
        stepperLabel: 'Success!'
      }
    ];

    return (
      <Fragment>
        <MainStepper data={data} activeKey={StudentEnrollmentStore.currentStep} />
      </Fragment>
    );
  };
};

AddStudentStepper.contextType = StoreContext;

export default observer(AddStudentStepper);
