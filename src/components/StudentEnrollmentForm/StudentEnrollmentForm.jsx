import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import InputField from '../base/InputField/InputField';
import { Col, Row } from 'react-bootstrap';
import MainForm from '../base/MainForm/MainForm';
import RadioButtonField from '../base/RadioButtonField/RadioButtonField';
import SelectField from '../base/SelectField/SelectField';
import { ViewField } from '../base/ViewPortlet/ViewPortlet';
import StepperContants from '../../../contants/StepperContants';
import BaseButton from '../base/BaseButton/BaseButton';
import BaseTemplate from '../base/BaseTemplate/BaseTemplate';
import BaseAddressField from '../base/BaseAddressField/BaseAddressField';

class StudentEnrollmentForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      genderList: [],
      yearlevelList: [],
      sectionList: [],
      strandList: [],
      adviser: null
    }
  }

  componentDidMount() {
    const { StudentEnrollmentStore } = this.context.store;
    StudentEnrollmentStore.getGenderList().then((list) => {
      this.setState({ genderList: list.genderListStr });
    });

    StudentEnrollmentStore.getYearlevelList().then((list) => {
      this.setState({ yearlevelList: list.yearlevelList });
    });

    StudentEnrollmentStore.getStrandList().then((list) => {
      this.setState({ strandList: list });
    });

    this.fetchSectionsList();
  };

  fetchSectionsList = () => {
    const { StudentEnrollmentStore } = this.context.store;
    const { strandKey, yearlevelKey } = StudentEnrollmentStore.enrollmentRequest;

    if (strandKey!=null && yearlevelKey!=null) {
      StudentEnrollmentStore.getSectionsList(yearlevelKey, strandKey).then((list) => {
        this.setState({ sectionList: list });
      });
    }
  };

  fetchAssignedAdviser = sectionId => {
    const { StudentEnrollmentStore } = this.context.store;

    if (sectionId!=null) {
      StudentEnrollmentStore.getAssignedAdviser(sectionId).then((obj) => {
        this.setState({ adviser: obj });
      });
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

  onChangeSelect = (fieldId, val) => {
    const { StudentEnrollmentStore } = this.context.store;

    if (val!=null && val.key!=null) {
      StudentEnrollmentStore.enrollmentRequest[fieldId]=val.key;
    }else{
      StudentEnrollmentStore.enrollmentRequest[fieldId]=null;
    }

    if (fieldId === 'yearlevelKey' || fieldId === 'strandKey') {
      this.fetchSectionsList();
    }

    if (fieldId === 'sectionId') {
      this.fetchAssignedAdviser(val.key);
    }
  };

  enrollmentForm = () => {
    const { StudentEnrollmentStore } = this.context.store;
    const { 
      genderList, 
      yearlevelList, 
      strandList, 
      sectionList, 
      adviser 
    } = this.state;

    return (
      <MainForm>
        <Row>
          <Col md={4}>
            <InputField
              label={'First Name'}
              maxLength={50}
              isRequired={true}
              type={'text'}
              value={StudentEnrollmentStore.enrollmentRequest.firstNm}
              onChange={e => this.onChangeInputs('firstNm', e.target.value)}
              onlyLetterSp={true}
            />
          </Col>
          <Col md={4}>
            <InputField
              label={'Midde Name'}
              maxLength={50}
              type={'text'}
              value={StudentEnrollmentStore.enrollmentRequest.middleNm}
              onChange={e => this.onChangeInputs('middleNm', e.target.value)}
              onlyLetterSp={true}
            />
          </Col>
          <Col md={4}>
            <InputField
              label={'Last Name'}
              maxLength={50}
              isRequired={true}
              type={'text'}
              value={StudentEnrollmentStore.enrollmentRequest.lastNm}
              onChange={e => this.onChangeInputs('lastNm', e.target.value)}
              onlyLetterSp={true}
            />
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <RadioButtonField
              options={genderList}
              label={'Gender'}
              value={StudentEnrollmentStore.enrollmentRequest.gender}
              isRequired={true}
              onChange={e => this.onChangeInputs('gender', e)}
            />
          </Col>
          <Col md={4}>
            <InputField
              label={'Birthday'}
              isRequired={true}
              type={'date'}
              value={StudentEnrollmentStore.enrollmentRequest.bday}
              onChange={e => this.onChangeInputs('bday', e.target.value)}
            />
          </Col>
          <Col md={4}>
            <InputField
              label={'Mobile Number'}
              isRequired={true}
              type={'text'}
              maxLength={11}
              value={StudentEnrollmentStore.enrollmentRequest.mobileNo}
              onChange={e => this.onChangeInputs('mobileNo', e.target.value)}
              isMobileNumber={true}
            />
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <BaseAddressField
              label={'Home Address'}
              value={StudentEnrollmentStore.enrollmentRequest.homeAddress}
              onPlaceSelected={e => {
                StudentEnrollmentStore.enrollmentRequest.homeAddress = e.display_name;
              }}
            />
          </Col>
          <Col md={4}>
            <InputField
              label={'Email Address (DepEd Provided)'}
              placeholder={'Enter Email Address'}
              maxLength={255}
              isRequired={true}
              type={'email'}
              value={StudentEnrollmentStore.enrollmentRequest.emailAddress}
              onChange={e => this.onChangeInputs('emailAddress', e.target.value)}
            />
          </Col>
        </Row>

        
        <Row>
          <Col md={4}>
            <InputField
              label={'Guardian First Name'}
              maxLength={50}
              isRequired={true}
              type={'text'}
              value={StudentEnrollmentStore.enrollmentRequest.guardianFirstNm}
              onChange={e => this.onChangeInputs('guardianFirstNm', e.target.value)}
              onlyLetterSp={true}
            />
          </Col>
          <Col md={4}>
            <InputField
              label={'Guardian Midde Name'}
              maxLength={50}
              type={'text'}
              value={StudentEnrollmentStore.enrollmentRequest.guardianMiddleNm}
              onChange={e => this.onChangeInputs('guardianMiddleNm', e.target.value)}
              onlyLetterSp={true}
            />
          </Col>
          <Col md={4}>
            <InputField
              label={'Guardian Last Name'}
              maxLength={50}
              isRequired={true}
              type={'text'}
              value={StudentEnrollmentStore.enrollmentRequest.guardianLastNm}
              onChange={e => this.onChangeInputs('guardianLastNm', e.target.value)}
              onlyLetterSp={true}
            />
          </Col>
        </Row>
        
        <Row>
          <Col md={4}>
            <InputField
              label={'Guardian Mobile Number'}
              isRequired={true}
              type={'text'}
              maxLength={11}
              value={StudentEnrollmentStore.enrollmentRequest.guardianMobileNo}
              onChange={e => this.onChangeInputs('guardianMobileNo', e.target.value)}
              isMobileNumber={true}
            />
          </Col>
        </Row>

        <div className='form_divider'></div>
        <Row>
          <Col md={8}>
            <SelectField
              label={'Strand'}
              isRequired={true}
              options={strandList}
              value={StudentEnrollmentStore.enrollmentRequest.strandKey}
              onChange={e => this.onChangeSelect('strandKey', e.target.value)}
            />
          </Col>
          <Col md={4}>
            <SelectField
              label={'Grade Level'}
              isRequired={true}
              options={yearlevelList}
              value={StudentEnrollmentStore.enrollmentRequest.yearlevelKey}
              onChange={e => this.onChangeSelect('yearlevelKey', e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <SelectField
              label={'Section'}
              isRequired={true}
              options={sectionList}
              value={StudentEnrollmentStore.enrollmentRequest.sectionId}
              onChange={e => this.onChangeSelect('sectionId', e.target.value)}
            />
          </Col>
          {StudentEnrollmentStore.enrollmentRequest.sectionId!=null && (
            <Fragment>
              <Col md={4}>
                <ViewField 
                  value={adviser}
                  label={'Assigned Adviser'}
                  valueIfNull={'No assigned faculty'}
                  // customClassName={'facultyField'}
                />
              </Col>
              <Col md={4}>
                <ViewField 
                  value={'Undergraduate'}
                  label={'Enrollment Status'}
                  customClassName={'statusField'}
                  icon={<i class="bi bi-person-lock"></i>}
                />
              </Col>
            </Fragment>
          )}
        </Row>
      </MainForm>
    );
  };
  
  onClickNext = () => {
    const { StudentEnrollmentStore, SettingsStore } = this.context.store;
    StudentEnrollmentStore.validateEnrollment(
      StudentEnrollmentStore.enrollmentRequest,
      res => {
        StudentEnrollmentStore.validatedData=res;
        StudentEnrollmentStore.currentStep=StepperContants.MANUAL_ENROLL_CREATE2;
      }, err => {
        SettingsStore.showModal({ type: 'error', errorList: err });
      }
    );
  };

  onClickReset = () => {
    const { StudentEnrollmentStore } = this.context.store;
    StudentEnrollmentStore.reset();
    this.setState({
      sectionList: [],
      adviser: null
    });
  };

  render() {
    return(
      <BaseTemplate
        onClickNext={() => this.onClickNext()}
        onReset={() => this.onClickReset()}
        currentStep={1}
        totalSteps={4}>

          {this.enrollmentForm()}
      </BaseTemplate>
    );
  };
};

StudentEnrollmentForm.contextType = StoreContext;

export default observer(StudentEnrollmentForm);