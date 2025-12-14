import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import ViewPortlet, { ViewField } from '../base/ViewPortlet/ViewPortlet';
import StepperContants from '../../../contants/StepperContants';
import CollapsiblePortlet from '../base/CollapsiblePortlet/CollapsiblePortlet';
import { Col, Row } from 'react-bootstrap';
import GroupCheckboxesField from '../base/GroupCheckboxesField/GroupCheckboxesField';
import BaseButton from '../base/BaseButton/BaseButton';

class StudentEnrollmentView extends Component {
  constructor(props) {
    super(props);
  }

  onClickBack = () => {
    const { onClickBack } = this.props;
    onClickBack&&onClickBack();
  };

  submitForm = () => {
    const { StudentEnrollmentStore, SettingsStore } = this.context.store;
    StudentEnrollmentStore.enrollmentRequest.hasEnrolledSubjects=true;
    StudentEnrollmentStore.saveEnrollment(
      StudentEnrollmentStore.validatedData,
      res => {
        StudentEnrollmentStore.validatedData=null;
        StudentEnrollmentStore.ackHeader.ackMessage=res.ackMessage;
        StudentEnrollmentStore.ackHeader.refNo=res.refNo;
        StudentEnrollmentStore.savedData=res;
        StudentEnrollmentStore.currentStep=StepperContants.MANUAL_ENROLL__ACK;
        SettingsStore.showSuccessPanel=true;
      }, err => {
        SettingsStore.showModal({ type: 'error', errorList: err });
      }
    );
  };

  getStudentEnrollmentView = () => {
    const { data, 
      isAck, 
      isView, 
      isConfirm,
      header,
      subHeader
    } = this.props;

    return (
      <Fragment>
        <ViewPortlet
          {...this.props}>
            <CollapsiblePortlet
              headerData={data.studentFullNm}
              headerDataLabel={'Student Information'}
              buttonLabel={'Enrollment Details'}>

              <Row>
                <Col md={6}>
                  <ViewField
                    label={'Gender'}
                    value={data.genderDscp}
                  />
                </Col>
                <Col md={6}>
                  <ViewField
                    label={'Birthday'}
                    value={data.bdayDscp}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <ViewField
                    label={'Home Address'}
                    value={data.homeAddress}
                  />
                </Col>
                <Col md={6}>
                  <ViewField
                    label={'Mobile Number'}
                    value={data.mobileNo}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <ViewField
                    label={'Guardian Name'}
                    value={data.guardianFullNm}
                  />
                </Col>
                <Col md={6}>
                  <ViewField
                    label={'Guardian Mobile Number'}
                    value={data.guardianMobileNo}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <ViewField
                    label={'Email Address (DepEd Provided)'}
                    value={data.emailAddress}
                  />
                </Col>
                <Col md={6}>
                  <ViewField
                    label={'Section'}
                    value={data.sectionNm}
                  />
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <ViewField
                    label={'Status'}
                    value={data.statusDscp}
                  />
                </Col>
                {isView && (
                  <Col md={6}>
                    <ViewField
                      label={'Date Enrolled'}
                      value={data.dateEnrolledDscp}
                    />
                  </Col>
                )}
              </Row>
            </CollapsiblePortlet>
          <div className='form_divider'></div>

          <Row>
            <Col md={6}>
              <ViewField
                label={'Enrollee Type'}
                value={data.enrolleeTypeDscp}
              />
            </Col>
            <Col md={6}>
              <ViewField
                label={'Learner Reference Number'}
                value={data.lrn}
              />
            </Col>
          </Row>

          <div className='subjects_grid'>
            {data.subjectNmListG11!=null && data.subjectNmListG11.length>0 && (
              <GroupCheckboxesField
                values={data.subjectNmListG11}
                label={'Grade 11 Subjects'}
                isView={true}
              />
            )}
            {data.subjectNmListG12!=null && data.subjectNmListG12.length>0 && (
              <GroupCheckboxesField
                values={data.subjectNmListG12}
                label={'Grade 12 Subjects'}
                isView={true}
              />
            )}
          </div>

          {isConfirm && (
            <div className='enrollmentStep_btns'>
              <BaseButton
                customClassName={'onClick_reset'}
                onClick={this.onClickBack}
                label={'Back'}
              />
              <BaseButton
                customClassName={'onClick_next'}
                onClick={this.submitForm}
                label={'Next'}
                hasIcon={true}
                hasIconPrefix={false}
              />
            </div>
          )}
          {isAck && (
            <div className='enrollmentStep_btns'>
              <BaseButton
                customClassName={'onClick_next'}
                onClick={this.onClickBack}
                label={'Done'}
              />
            </div>
          )}
          {isView && (
            <div className='enrollmentStep_btns'>
              <BaseButton
                customClassName={'onClick_reset'}
                onClick={this.onClickBack}
                label={'Back'}
              />
            </div>
          )}
        </ViewPortlet>
      </Fragment>
    );  
  };

  render() {
    return this.getStudentEnrollmentView();
  };
};

StudentEnrollmentView.contextType = StoreContext;

export default observer(StudentEnrollmentView);
