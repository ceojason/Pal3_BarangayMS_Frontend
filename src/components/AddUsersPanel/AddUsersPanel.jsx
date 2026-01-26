import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseTemplate from '../base/BaseTemplate/BaseTemplate';
import MainForm from '../base/MainForm/MainForm';
import { Col, Row } from 'react-bootstrap';
import InputField from '../base/InputField/InputField';
import RadioButtonField from '../base/RadioButtonField/RadioButtonField';
import SelectField from '../base/SelectField/SelectField';
import BasePanel from '../base/BasePanel/BasePanel';
import GroupCheckboxesField from '../base/GroupCheckboxesField/GroupCheckboxesField';
import StepperContants from '../../../contants/StepperContants';

class AddUsersPanel extends Component {
  constructor(props) {
    super(props);
    this.state={
      genderList: [],
      civilStatusList: [],
      phaseList: [],
      yesNoList: [],
      residentTypeList: []
    };
  }

  componentDidMount() {
    const { UsersStore } = this.context.store;

    UsersStore.getGenderList().then((list) => {
      this.setState({ genderList: list.genderListStr });
    });

    UsersStore.getCivilStatusList().then((list) => {
      this.setState({ civilStatusList: list.civilStatusList });
    });

    UsersStore.getPhaseList().then((list) => {
      this.setState({ phaseList: list.purokList });
    });

    UsersStore.getYesNoList().then((list) => {
      this.setState({ yesNoList: list.yesNoList });
    });

    UsersStore.getResidentTypeList().then((list) => {
      this.setState({ residentTypeList: list.residentTypeList });
    });
  };

  onChangeInputs = (fieldId, val) => {
    const { UsersStore } = this.context.store;

    if (val!=null) {
      UsersStore.enrollmentRequest[fieldId]=val;
    }else{
      UsersStore.enrollmentRequest[fieldId]=null;
    }
  };

  onChangeSelect = (fieldId, val) => {
    const { UsersStore } = this.context.store;

    if (val!=null && val.key!=null) {
      UsersStore.enrollmentRequest[fieldId]=val.key;
    }else{
      UsersStore.enrollmentRequest[fieldId]=null;
    }
  };

  form = () => {
    const { UsersStore } = this.context.store;
    const { genderList, civilStatusList, phaseList, yesNoList, residentTypeList } = this.state;

    return (
      <MainForm>
        <BasePanel
          icon={<i class="bi bi-person-circle"></i>}
          header={'Personal Information'}>
          <Row>
            <Col md={3}>
              <InputField
                label={'First Name'}
                maxLength={50}
                isRequired={true}
                type={'text'}
                value={UsersStore.enrollmentRequest.firstNm}
                onChange={e => this.onChangeInputs('firstNm', e.target.value)}
                onlyLetterSp={true}
              />
            </Col>
            <Col md={3}>
              <InputField
                label={'Midde Name'}
                maxLength={50}
                type={'text'}
                value={UsersStore.enrollmentRequest.middleNm}
                onChange={e => this.onChangeInputs('middleNm', e.target.value)}
                onlyLetterSp={true}
              />
            </Col>
            <Col md={3}>
              <InputField
                label={'Last Name'}
                maxLength={50}
                isRequired={true}
                type={'text'}
                value={UsersStore.enrollmentRequest.lastNm}
                onChange={e => this.onChangeInputs('lastNm', e.target.value)}
                onlyLetterSp={true}
              />
            </Col>
            <Col md={3}>
              <InputField
                label={'Suffix'}
                maxLength={5}
                type={'text'}
                value={UsersStore.enrollmentRequest.suffix}
                onChange={e => this.onChangeInputs('suffix', e.target.value)}
                onlyLetterSp={true}
                inst={'Leave blank if not applicable'}
              />
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <InputField
                label={'Birth Date'}
                isRequired={true}
                type={'date'}
                value={UsersStore.enrollmentRequest.birthDt}
                onChange={e => this.onChangeInputs('birthDt', e.target.value)}
              />
            </Col>
            <Col md={5}>
              <InputField
                label={'Birth Place'}
                maxLength={255}
                isRequired={true}
                type={'text'}
                value={UsersStore.enrollmentRequest.birthPlace}
                onChange={e => this.onChangeInputs('birthPlace', e.target.value)}
                inst={'City/Municipality, Province, Country'}
              />
            </Col>
            <Col md={2}>
              <SelectField
                label={'Gender'}
                isRequired={true}
                options={genderList}
                value={UsersStore.enrollmentRequest.gender}
                onChange={e => this.onChangeSelect('gender', e.target.value)}
              />
            </Col>
            <Col md={2}>
              <SelectField
                label={'Civil Status'}
                isRequired={true}
                options={civilStatusList}
                value={UsersStore.enrollmentRequest.civilStatusKey}
                onChange={e => this.onChangeSelect('civilStatusKey', e.target.value)}
              />
            </Col>
          </Row>
        </BasePanel>

        <BasePanel header={'Contact Information'} icon={<i class="bi bi-telephone-forward-fill"></i>}>
          <Row>
            <Col md={4}>
              <InputField
                label={'Contact Number'}
                placeholder={'09XXXXXXXXX'}
                isRequired={true}
                type={'text'}
                maxLength={11}
                value={UsersStore.enrollmentRequest.mobileNo}
                onChange={e => this.onChangeInputs('mobileNo', e.target.value)}
                isMobileNumber={true}
              />
            </Col>
            <Col md={4}>
              <InputField
                label={'Email Address'}
                placeholder={'resident.user@example.com'}
                maxLength={255}
                type={'email'}
                value={UsersStore.enrollmentRequest.emailAddress}
                onChange={e => this.onChangeInputs('emailAddress', e.target.value)}
              />
            </Col>
            <Col md={4}>
              <SelectField
                label={'Purok'}
                isRequired={true}
                options={phaseList}
                value={UsersStore.enrollmentRequest.phaseKey}
                onChange={e => this.onChangeSelect('phaseKey', e.target.value)}
              />
            </Col>
          </Row>
        </BasePanel>

        <BasePanel header={'Address, Household, and Other Information'} icon={<i class="bi bi-geo-fill"></i>}>
          <Row>
            <Col md={8}>
              <InputField
                label={'Home Address'}
                maxLength={255}
                isRequired={true}
                type={'text'}
                value={UsersStore.enrollmentRequest.homeAddress}
                onChange={e => this.onChangeInputs('homeAddress', e.target.value)}
                inst={'House Number, Lot, Street, Barangay, City/Municipality, Province'}
              />
            </Col>
            <Col md={4}>
              <SelectField
                label={'Household'}
                // isRequired={true}
                options={null}
                value={UsersStore.enrollmentRequest.householdKey}
                onChange={e => this.onChangeSelect('householdKey', e.target.value)}
              />
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <InputField
                label={'Occupation'}
                placeholder={'Enter Occupation'}
                maxLength={100}
                value={UsersStore.enrollmentRequest.occupation}
                onChange={e => this.onChangeInputs('occupation', e.target.value)}
                inst={'Leave blank if not applicable'}
              />
            </Col>
            <Col md={4}>
              <InputField
                label={'Religion'}
                maxLength={50}
                isRequired={true}
                type={'text'}
                value={UsersStore.enrollmentRequest.religion}
                onChange={e => this.onChangeInputs('religion', e.target.value)}
              />
            </Col>
            <Col md={4}>
              <SelectField
                label={'Is a Registered Voter?'}
                isRequired={true}
                options={yesNoList}
                value={UsersStore.enrollmentRequest.isRegisteredVoter}
                onChange={e => this.onChangeSelect('isRegisteredVoter', e.target.value)}
              />
            </Col>
          </Row>

          <Row>
            <GroupCheckboxesField
              values={residentTypeList}
              label={'Resident Classification'}
              value={'key'}
              store={UsersStore.enrollmentRequest.residentClassKeys}
              startingIndex={1000}
              itemLabel={'value'}
              customClassName={'checkboxes_displayinrow'}
              required={true}
              inst={'Select all applicable'}
            />
          </Row>
        </BasePanel>
      </MainForm>
    );
  };

  onClickNext = () => {
    const { UsersStore, SettingsStore } = this.context.store;
    SettingsStore.isLoading=true;
    UsersStore.validateEnrollment(
      UsersStore.enrollmentRequest, res => {
        SettingsStore.isLoading=false;
        UsersStore.validatedData = res;
        UsersStore.currentStep = StepperContants.MANUAL_ENROLL__CONFIRM;
      }, err => {
        SettingsStore.isLoading=false;
        SettingsStore.showModal({
          type: 'error',
          errorList: err
        });
      }
    );
  };

  onReset = () => {
    const { UsersStore } = this.context.store;

    UsersStore.reset();
  };

  render() {
    return (
      <BaseTemplate
        onClickNext={() => this.onClickNext()}
        onReset={() => this.onReset()}
        currentStep={1}
        totalSteps={3}
        {...this.props}>
          {this.form()}
      </BaseTemplate>
    );
  }
};

AddUsersPanel.contextType = StoreContext;

export default observer(AddUsersPanel);
