import React, { Component, Fragment } from 'react';
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
import { ViewField } from '../base/ViewPortlet/ViewPortlet';

class AddUsersPanel extends Component {
  constructor(props) {
    super(props);
    this.state={
      genderList: [],
      civilStatusList: [],
      phaseList: [],
      yesNoList: [],
      residentTypeList: [],
      brgyPositionList: [],
      householdList: [],
      getHouseholdListApi: true
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

    UsersStore.getBrgyPositionList().then((list) => {
      this.setState({ brgyPositionList: list.brgyPositionList });
    });

    if (this.state.getHouseholdListApi) {
      this.getHouseholdListWithHead();
      this.setState({ getHouseholdListApi: false });
    }
  };

  onChangeInputs = (fieldId, val) => {
    const { UsersStore } = this.context.store;

    if (val!=null&& val.trim() !== '') {
      UsersStore.enrollmentRequest[fieldId]=val;
    }else{
      UsersStore.enrollmentRequest[fieldId]=null;
    }

    if (fieldId=='block' || fieldId=='lot' || fieldId=='street') {
      this.getHouseholdListWithHead();
      this.getTempHouseholdStringForSave();
    }
  };

  onChangeSelect = (fieldId, val) => {
    const { UsersStore } = this.context.store;

    if (val!=null && val.key!=null) {
      UsersStore.enrollmentRequest[fieldId]=val.key;
    }else{
      UsersStore.enrollmentRequest[fieldId]=null;
    }

    if (fieldId=='isHouseholdHead' && val.key===0) {
      this.getTempHouseholdStringForSave();
      UsersStore.enrollmentRequest.householdKey = null;
    }
    else if (fieldId=='isHouseholdHead' && val.key===1) {
      this.getHouseholdListWithHead();
      UsersStore.enrollmentRequest.tempHouseholdForSave = null;
    }
    else if (fieldId=='phaseKey' && val!=null) {
      this.getHouseholdListWithHead();
      UsersStore.enrollmentRequest.tempHouseholdForSave = null;
      this.getTempHouseholdStringForSave();
    }
  };

  getHouseholdListWithHead = async () => {
    const { UsersStore, SettingsStore } = this.context.store;

    if (UsersStore.enrollmentRequest.block!=null && UsersStore.enrollmentRequest.lot!=null &&
      UsersStore.enrollmentRequest.block!='' && UsersStore.enrollmentRequest.lot!='' &&
      UsersStore.enrollmentRequest.phaseKey!=null
    ) {
      try {
        const res = await UsersStore.getHouseholdList(UsersStore.enrollmentRequest.block, UsersStore.enrollmentRequest.lot, UsersStore.enrollmentRequest.phaseKey);
        this.setState({
          householdList: res
        });

      } catch (err) {
        SettingsStore.showModal({
          type: 'error',
          errorList: err
        });
      }
    }
  };

  getTempHouseholdStringForSave = () => {
    const { UsersStore, SettingsStore } = this.context.store;
    UsersStore.createHouseholdForRegistration(
      UsersStore.enrollmentRequest, res => {
        UsersStore.enrollmentRequest.tempHouseholdForSave = res;
      }, err => {
        SettingsStore.showModal({
          type: 'error',
          errorList: err
        });
      }
    );
  };

  form = () => {
    const { UsersStore } = this.context.store;
    const { genderList, civilStatusList, phaseList, yesNoList, residentTypeList,
      brgyPositionList, householdList
     } = this.state;

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
                // inst={'Leave blank if not applicable'}
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
            <Col md={3}>
              <SelectField
                label={'Gender'}
                isRequired={true}
                options={genderList}
                value={UsersStore.enrollmentRequest.gender}
                onChange={e => this.onChangeSelect('gender', e.target.value)}
              />
            </Col>
            <Col md={6}>
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
          </Row>

          <Row>
            <Col md={3}>
              <SelectField
                label={'Civil Status'}
                isRequired={true}
                options={civilStatusList}
                value={UsersStore.enrollmentRequest.civilStatusKey}
                onChange={e => this.onChangeSelect('civilStatusKey', e.target.value)}
              />
            </Col>
            <Col md={3}>
              <InputField
                label={'Occupation'}
                placeholder={'Enter Occupation'}
                maxLength={100}
                value={UsersStore.enrollmentRequest.occupation}
                onChange={e => this.onChangeInputs('occupation', e.target.value)}
                // inst={'Leave blank if not applicable'}
              />
            </Col>
            <Col md={3}>
              <InputField
                label={'Religion'}
                maxLength={50}
                isRequired={true}
                type={'text'}
                value={UsersStore.enrollmentRequest.religion}
                onChange={e => this.onChangeInputs('religion', e.target.value)}
              />
            </Col>
            <Col md={3}>
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
            <Col md={3}>
              <SelectField
                label={'Is a Barangay Official?'}
                isRequired={true}
                options={yesNoList}
                value={UsersStore.enrollmentRequest.isBrgyOfficial}
                onChange={e => this.onChangeSelect('isBrgyOfficial', e.target.value)}
              />
            </Col>
            {UsersStore.enrollmentRequest.isBrgyOfficial!=null &&
              UsersStore.enrollmentRequest.isBrgyOfficial==0 && (
              <Col md={3}>
                <SelectField
                  label={'Barangay Position'}
                  isRequired={true}
                  options={brgyPositionList}
                  value={UsersStore.enrollmentRequest.brgyPositionKey}
                  onChange={e => this.onChangeSelect('brgyPositionKey', e.target.value)}
                />
              </Col>
              )
            }
          </Row>
        </BasePanel>

        <BasePanel header={'Home Address & Contact Information'} icon={<i class="bi bi-telephone-forward-fill"></i>}>
          <Row>
            <Col md={3}>
              <InputField
                label={'Block/House No.'}
                maxLength={255}
                isRequired={true}
                type={'text'}
                value={UsersStore.enrollmentRequest.block}
                onChange={e => this.onChangeInputs('block', e.target.value)}
                // inst={'eg. Block IB26'}
              />
            </Col>
            <Col md={3}>
              <InputField
                label={'Lot No.'}
                maxLength={255}
                isRequired={true}
                type={'text'}
                value={UsersStore.enrollmentRequest.lot}
                onChange={e => this.onChangeInputs('lot', e.target.value)}
                // inst={'eg. Lot 10'}
              />
            </Col>
            <Col md={3}>
              <InputField
                label={'Street'}
                maxLength={255}
                type={'text'}
                value={UsersStore.enrollmentRequest.street}
                onChange={e => this.onChangeInputs('street', e.target.value)}
                // inst={'eg. Mabini Street'}
              />
            </Col>
            <Col md={3}>
              <SelectField
                label={'Purok'}
                isRequired={true}
                options={phaseList}
                value={UsersStore.enrollmentRequest.phaseKey}
                onChange={e => this.onChangeSelect('phaseKey', e.target.value)}
              />
            </Col>
          </Row>

          {(
            UsersStore.enrollmentRequest.block!=null &&
            UsersStore.enrollmentRequest.lot!=null &&
            UsersStore.enrollmentRequest.block!='' &&
            UsersStore.enrollmentRequest.lot!='' &&
            UsersStore.enrollmentRequest.phaseKey!=null 
          ) && (
            <Row>
              <Col md={3}>
                <SelectField
                  label={'Household Head?'}
                  isRequired={true}
                  options={yesNoList}
                  value={UsersStore.enrollmentRequest.isHouseholdHead}
                  onChange={e => this.onChangeSelect('isHouseholdHead', e.target.value)}
                  inst={'If Yes, the system will automatically add a new household'}
                />
              </Col>

              {UsersStore.enrollmentRequest.isHouseholdHead!=null &&
               UsersStore.enrollmentRequest.isHouseholdHead==0 &&
               UsersStore.enrollmentRequest.tempHouseholdForSave!=null && (
                <Col md={6}>
                  <ViewField
                    label={'Household Description'}
                    value={UsersStore.enrollmentRequest.tempHouseholdForSave}
                    customClassName={'custom_viewfield'}
                  />
                </Col>
              )}

              {UsersStore.enrollmentRequest.isHouseholdHead!=null &&
               UsersStore.enrollmentRequest.isHouseholdHead==1 && (
                <Col md={9}>
                  <SelectField
                    label={'Household'}
                    isRequired={true}
                    options={householdList}
                    value={UsersStore.enrollmentRequest.householdKey}
                    onChange={e => this.onChangeSelect('householdKey', e.target.value)}
                  />
                </Col>
              )}
            </Row>
          )}

          <Row>
            <Col md={6}>
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
            <Col md={6}>
              <InputField
                label={'Email Address'}
                placeholder={'resident.user@example.com'}
                maxLength={255}
                type={'email'}
                value={UsersStore.enrollmentRequest.emailAddress}
                onChange={e => this.onChangeInputs('emailAddress', e.target.value)}
              />
            </Col>
          </Row>
        </BasePanel>

        <BasePanel>
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
              inst={'Select all applicable; will be used for sending alerts and announcement'}
            />
          </Row>
        </BasePanel>
      </MainForm>
    );
  };

  onClickNext = () => {
    const { UsersStore, SettingsStore } = this.context.store;
    SettingsStore.isLoading=true;
    SettingsStore.isProcessing = true;
    UsersStore.validateEnrollment(
      UsersStore.enrollmentRequest, res => {
        SettingsStore.isLoading=false;
        UsersStore.validatedData = res;
        SettingsStore.isProcessing = false;
        UsersStore.currentStep = StepperContants.MANUAL_ENROLL__CONFIRM;
      }, err => {
        SettingsStore.isProcessing = false;
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
