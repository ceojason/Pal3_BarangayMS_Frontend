import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import MainStepper from '../base/MainStepper/MainStepper';
import StepperContants from '../../../contants/StepperContants';
import StudentInquiryPanel from '../StudentInquiryPanel/StudentInquiryPanel';
import StudentEnrollmentView from '../StudentEnrollmentView/StudentEnrollmentView';

class StudentInquiryStepper extends Component {
  constructor(props) {
    super(props);
  }

  onClickBack = () => {
    const { StudentEnrollmentStore } = this.context.store;
    StudentEnrollmentStore.searchStep=StepperContants.INQUIRY_INITIAL;
  };

  render() {
    const { StudentEnrollmentStore } = this.context.store;

    let data=[
      {
        key: StepperContants.INQUIRY_INITIAL,
        content: (
          <StudentInquiryPanel />
        )
      },
      {
        key: StepperContants.INQUIRY_VIEW,
        content: (
          <StudentEnrollmentView 
            data={StudentEnrollmentStore.viewData}
            isView={true}
            onClickBack={this.onClickBack}
          />
        )
      }
    ];
    return (
      <Fragment>
        <MainStepper isInquiry={true} data={data} activeKey={StudentEnrollmentStore.searchStep} />
      </Fragment>
    );
  };
};

StudentInquiryStepper.contextType = StoreContext;

export default observer(StudentInquiryStepper);
