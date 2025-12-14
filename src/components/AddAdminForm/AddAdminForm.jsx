import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseTemplate from '../base/BaseTemplate/BaseTemplate';
import MainForm from '../base/MainForm/MainForm';
import { Col, Row } from 'react-bootstrap';
import InputField from '../base/InputField/InputField';
import RadioButtonField from '../base/RadioButtonField/RadioButtonField';
import StepperContants from '../../../contants/StepperContants';
import BaseAddressField from '../base/BaseAddressField/BaseAddressField';

class AddAdminForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      genderList: []
    }
  }

  componentDidMount() {
    const { AdminEnrollmentStore } = this.context.store;
    AdminEnrollmentStore.getGenderList().then((list) => {
      this.setState({ genderList: list.genderListStr });
    });
  };

  onChangeInputs = (fieldId, val) => {
    const { AdminEnrollmentStore } = this.context.store;
    if (val!=null) {
      AdminEnrollmentStore.inputs[fieldId]=val;
    }else{
      AdminEnrollmentStore.inputs[fieldId]=null;
    }
  };

  enrollmentForm = () => {
    const { AdminEnrollmentStore } = this.context.store;
    const { genderList } = this.state;

    return (
      <MainForm>
        <Row>
          <Col md={4}>
            <InputField
              label={'First Name'}
              maxLength={50}
              isRequired={true}
              type={'text'}
              value={AdminEnrollmentStore.inputs.firstNm}
              onChange={e => this.onChangeInputs('firstNm', e.target.value)}
              onlyLetterSp={true}
            />
          </Col>
          <Col md={4}>
            <InputField
              label={'Midde Name'}
              maxLength={50}
              type={'text'}
              value={AdminEnrollmentStore.inputs.middleNm}
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
              value={AdminEnrollmentStore.inputs.lastNm}
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
              value={AdminEnrollmentStore.inputs.gender}
              isRequired={true}
              onChange={e => this.onChangeInputs('gender', e)}
            />
          </Col>
          <Col md={4}>
            <InputField
              label={'Birthday'}
              isRequired={true}
              type={'date'}
              value={AdminEnrollmentStore.inputs.bday}
              onChange={e => this.onChangeInputs('bday', e.target.value)}
            />
          </Col>
          <Col md={4}>
            <InputField
              label={'Mobile Number'}
              isRequired={true}
              type={'text'}
              maxLength={11}
              value={AdminEnrollmentStore.inputs.mobileNo}
              onChange={e => this.onChangeInputs('mobileNo', e.target.value)}
              isMobileNumber={true}
            />
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <BaseAddressField
              label={'Home Address'}
              value={AdminEnrollmentStore.inputs.homeAddress}
              onPlaceSelected={e => {
               AdminEnrollmentStore.inputs.homeAddress = e.display_name;
              }}
            />
          </Col>
          <Col md={4}>
            <InputField
              label={'Email Address'}
              placeholder={'Enter Email Address'}
              maxLength={255}
              isRequired={true}
              type={'email'}
              value={AdminEnrollmentStore.inputs.emailAddress}
              onChange={e => this.onChangeInputs('emailAddress', e.target.value)}
            />
          </Col>
        </Row>
      </MainForm>
    );
  };

  onClickNext = () => {
    const { AdminEnrollmentStore, SettingsStore } = this.context.store;
    AdminEnrollmentStore.validateEnrollment(
      AdminEnrollmentStore.inputs,
      res => {
        AdminEnrollmentStore.validatedData=res;
        AdminEnrollmentStore.currentStep=StepperContants.MANUAL_ENROLL__CONFIRM;
      }, err => {
        SettingsStore.showModal({ type: 'error', errorList: err });
      }
    );
  };

  onClickReset = () => {
    const { AdminEnrollmentStore } = this.context.store;
    AdminEnrollmentStore.reset();
  };

  render() {
    return (
      <BaseTemplate
        onClickNext={() => this.onClickNext()}
        onReset={() => this.onClickReset()}>
          {this.enrollmentForm()}
      </BaseTemplate>
    );
  };
};

AddAdminForm.contextType = StoreContext;

export default observer(AddAdminForm);
