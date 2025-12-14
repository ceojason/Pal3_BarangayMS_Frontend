import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import { ViewField } from '../base/ViewPortlet/ViewPortlet';
import CollapsiblePortlet from '../base/CollapsiblePortlet/CollapsiblePortlet';
import { Col, Row } from 'react-bootstrap';
import StepperContants from '../../../contants/StepperContants';
import GroupCheckboxesField from '../base/GroupCheckboxesField/GroupCheckboxesField';
import SelectField from '../base/SelectField/SelectField';
import { EnrolleeTypeEnum } from '../../constants/enums/EnrolleeTypeEnum';
import MainForm from '../base/MainForm/MainForm';
import InputField from '../base/InputField/InputField';
import BaseButton from '../base/BaseButton/BaseButton';
import BaseTemplate from '../base/BaseTemplate/BaseTemplate';

class StudentEnrollmentForm2 extends Component {
  constructor(props) {
    super(props);
    this.state={
      grade11SubjectList: [],
      grade12SubjectList: [],
      enrolleeTypeList: []
    };
  }

  componentDidMount() {
    const { StudentEnrollmentStore } = this.context.store;
    const { data } = this.props;

    if (data && data.strandKey!=null && data.yearlevelKey!=null) {
      StudentEnrollmentStore.getSubjectList(data.yearlevelKey, data.strandKey).then((list) => {
        this.setState({ 
          grade11SubjectList: list.grade11SubjectList,
          grade12SubjectList: list.grade12SubjectList
        });
      });
    }

    StudentEnrollmentStore.getEnrolleeTypeList().then((list) => {
      this.setState({
        enrolleeTypeList: list.enrolleeTypeList
      });
    });
  };

  onClickBack = () => {
    const { StudentEnrollmentStore } = this.context.store;
    StudentEnrollmentStore.validatedData=null;
    StudentEnrollmentStore.currentStep=StepperContants.MANUAL_ENROLL_CREATE;
  };

  onChangeSelect = (fieldId, val) => {
    const { StudentEnrollmentStore } = this.context.store;
    const { grade11SubjectList, grade12SubjectList } = this.state;

    const hasAutoCheckedKeys = [
      EnrolleeTypeEnum.NEW_ENROLLEE.key,
      EnrolleeTypeEnum.FOREIGN.key
    ];

    if (val && val.key != null) {
      StudentEnrollmentStore.enrollmentRequest[fieldId] = val.key;
    } else {
      StudentEnrollmentStore.enrollmentRequest[fieldId] = null;
    }

    const selectedKey = StudentEnrollmentStore.enrollmentRequest.enrolleeTypeKey;

    if (
      selectedKey != null &&
      hasAutoCheckedKeys.includes(selectedKey)
    ) {
      const subjectIds = [];

      if (Array.isArray(grade11SubjectList)) {
        subjectIds.push(...grade11SubjectList.map(item => item.id));
      }

      if (Array.isArray(grade12SubjectList)) {
        subjectIds.push(...grade12SubjectList.map(item => item.id));
      }

      StudentEnrollmentStore.enrollmentRequest.enrolledSubjects = subjectIds;
    } else {
      StudentEnrollmentStore.enrollmentRequest.enrolledSubjects = [];
    }
  };

  onChangeInputs = (fieldId, val) => {
    const { StudentEnrollmentStore } = this.context.store;
    if (val!=null) {
      StudentEnrollmentStore.enrollmentRequest[fieldId]=val;
    }else{
      StudentEnrollmentStore.enrollmentRequest[fieldId]=null;
    }
  };

  submitForm = () => {
    const { StudentEnrollmentStore, SettingsStore } = this.context.store;
    StudentEnrollmentStore.enrollmentRequest.hasEnrolledSubjects=true;
    StudentEnrollmentStore.validateEnrollmentNotInitial(
      StudentEnrollmentStore.enrollmentRequest,
      res => {
        StudentEnrollmentStore.validatedData=res;
        StudentEnrollmentStore.currentStep=StepperContants.MANUAL_ENROLL__CONFIRM;
      }, err => {
        SettingsStore.showModal({ type: 'error', errorList: err });
      }
    );
  };

  render() {
    const { StudentEnrollmentStore } = this.context.store;
    const { data } = this.props;
    const { grade11SubjectList, grade12SubjectList, enrolleeTypeList } = this.state;
    let hasAutoCheckedKeys = [EnrolleeTypeEnum.NEW_ENROLLEE.key,EnrolleeTypeEnum.FOREIGN.key];

    return (
      <BaseTemplate
        onClickNext={() => this.submitForm()}
        onClickBack={() => this.onClickBack()}>
        <MainForm>
          <div className='enrollmentstep2_ctr'>
            <CollapsiblePortlet
              headerData={data.studentFullNm}
              headerDataLabel={'Student Information'}
              buttonLabel={'Enrollment Details'}>

                <Row>
                  <Col md={4}>
                    <ViewField
                      label={'Gender'}
                      value={data.genderDscp}
                    />
                  </Col>
                  <Col md={4}>
                    <ViewField
                      label={'Birthday'}
                      value={data.bdayDscp}
                    />
                  </Col>
                  <Col md={4}>
                    <ViewField
                      label={'Mobile Number'}
                      value={data.mobileNo}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={8}>
                    <ViewField
                      label={'Home Address'}
                      value={data.homeAddress}
                    />
                  </Col>
                  <Col md={4}>
                    <ViewField
                      label={'Email Address (DepEd Provided)'}
                      value={data.emailAddress}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <ViewField
                      label={'Guardian Name'}
                      value={data.guardianFullNm}
                    />
                  </Col>
                  <Col md={4}>
                    <ViewField
                      label={'Guardian Mobile Number'}
                      value={data.guardianMobileNo}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <ViewField
                      label={'Grade Level'}
                      value={data.yearlevelDscp}
                    />
                  </Col>
                  <Col md={4}>
                    <ViewField
                      label={'Strand - Section'}
                      value={data.sectionNm}
                    />
                  </Col>
                </Row>
            </CollapsiblePortlet>

            {/* subjects */}
            <div className='form_divider'></div>
            <div className='reg_irreg_ctr'>
              <Row>
                <Col md={6}>
                  <SelectField
                    label={'Enrollee Type'}
                    isRequired={true}
                    options={enrolleeTypeList}
                    value={StudentEnrollmentStore.enrollmentRequest.enrolleeTypeKey}
                    onChange={e => this.onChangeSelect('enrolleeTypeKey', e.target.value)}
                  />
                </Col>
                <Col>
                  <InputField
                    label={'Learner Reference Number'}
                    maxLength={12}
                    isRequired={true}
                    type={'text'}
                    value={StudentEnrollmentStore.enrollmentRequest.lrn}
                    onChange={e => this.onChangeInputs('lrn', e.target.value)}
                    onlyNumber={true}
                  />
                </Col>
              </Row>
              {StudentEnrollmentStore.enrollmentRequest.enrolleeTypeKey!=null && !hasAutoCheckedKeys.includes(StudentEnrollmentStore.enrollmentRequest.enrolleeTypeKey) && (
                <div className='warning_mgs_ctr'>
                  <span className='warning_msg_body'>
                    <i class="bi bi-info-circle-fill"></i>
                    You can add the subjects required for the current school year and can later update if they have already taken the subject or do not need to retake.
                  </span>
                </div>
              )}
            </div>
            {StudentEnrollmentStore.enrollmentRequest.enrolleeTypeKey!=null && (
              <div className='subjects_grid'>
                {grade11SubjectList!=null && grade11SubjectList.length>0 && (
                  <GroupCheckboxesField
                    values={grade11SubjectList}
                    label={'Grade 11 Subjects'}
                    store={StudentEnrollmentStore.enrollmentRequest.enrolledSubjects}
                    startingIndex={1000}
                    value={'id'}
                    keyValue={StudentEnrollmentStore.enrollmentRequest.enrolleeTypeKey}
                    hasAutoCheckedKeys={hasAutoCheckedKeys}
                    itemLabel={'subjectNm'}
                  />
                )}
                {grade12SubjectList!=null && grade12SubjectList.length>0 && (
                  <GroupCheckboxesField
                    values={grade12SubjectList}
                    label={'Grade 12 Subjects'}
                    store={StudentEnrollmentStore.enrollmentRequest.enrolledSubjects}
                    startingIndex={100000}
                    value={'id'}
                    keyValue={StudentEnrollmentStore.enrollmentRequest.enrolleeTypeKey}
                    hasAutoCheckedKeys={hasAutoCheckedKeys}
                    itemLabel={'subjectNm'}
                  />
                )}
              </div>
            )}
          </div>
        </MainForm>
      </BaseTemplate>
    );
  };
};

StudentEnrollmentForm2.contextType = StoreContext;

export default observer(StudentEnrollmentForm2);