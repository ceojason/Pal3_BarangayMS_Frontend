import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import { Col, Row } from 'react-bootstrap';
import ViewField from '../base/ViewPortlet/ViewPortlet';
import ViewPortlet from '../base/ViewPortlet/ViewPortlet';
import InputField from '../base/InputField/InputField';
import SelectField from '../base/SelectField/SelectField';
import BaseButton from '../base/BaseButton/BaseButton';

class MyProfilePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
      genderList: [],
      civilStatusList: [],
      phaseList: [],
      yesNoList: [],
      residentTypeList: [],
      imageSaved: false
    };
  }

  componentDidMount() {
    const { SessionStore, UsersStore } = this.context.store;

    const userId = SessionStore.currentUser?.userId;
    if (userId) {
      const savedImage = localStorage.getItem(`profileImage_${userId}`);
      if (savedImage) {
        this.setState({ profileImage: savedImage });
      }

      // Load user data
      UsersStore.findUserdataById(userId).then(data => {
        UsersStore.enrollmentRequest = data;
      });
    }

    // Load dropdown lists
    UsersStore.getGenderList().then(list => {
      this.setState({ genderList: list.genderListStr });
    });

    UsersStore.getCivilStatusList().then(list => {
      this.setState({ civilStatusList: list.civilStatusList });
    });

    UsersStore.getPhaseList().then(list => {
      this.setState({ phaseList: list.purokList });
    });

    UsersStore.getYesNoList().then(list => {
      this.setState({ yesNoList: list.yesNoList });
    });

    UsersStore.getResidentTypeList().then(list => {
      this.setState({ residentTypeList: list.residentTypeList });
    });
  }

  handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      this.setState({ profileImage: base64Image, imageSaved: true });

      // Save to localStorage using userId as key
      const { SessionStore } = this.context.store;
      const userId = SessionStore.currentUser?.userId;
      if (userId) {
        localStorage.setItem(`profileImage_${userId}`, base64Image);
      }

      // Hide banner after 5 seconds
      setTimeout(() => this.setState({ imageSaved: false }), 5000);
    };
    reader.readAsDataURL(file);
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

  

  getMyProfile = () => {
    const { genderList, civilStatusList, phaseList, yesNoList, residentTypeList, profileImage } = this.state;
    const { SessionStore, UsersStore } = this.context.store;

    const currentUser = SessionStore.currentUser;

    if (!currentUser) return null; // or loader

    return (
      <div className="my_profile_ctr">
        <div className="profile_img_ctr">
          {this.state.imageSaved && (
            <div className="image-saved-banner">
              Image saved successfully!
            </div>
          )}

          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profile_img" />
          ) : (
            <i className="bi bi-person-circle profile_icon"></i>
          )}

          <label className="upload_btn">
            Change Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={this.handleImageUpload}
            />
          </label>
        </div>

        <div className='profile_last_logindt'>
          <span className='date_label'>Active since</span>
          <span className='date'>{UsersStore.enrollmentRequest.lastLoginDtString}</span>
        </div>

        <div className='profile_body'>
          <div><div className='form_divider'></div>
            <div className='profile_portlet_header'>
              <span>
                <i class="bi bi-person-circle"></i>Personal Information
              </span>
            </div> 
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
                  label={'Middle Name'}
                  maxLength={50}
                  isRequired={true}
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
                  disabled={true}
                  value={UsersStore.enrollmentRequest.birthDtString}
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
            </Row><div className='form_divider'></div>

            <div className='profile_portlet_header'>
              <span>
                <i class="bi bi-telephone-forward-fill"></i>Contact Information
              </span>
            </div> 
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
            </Row><div className='form_divider'></div>

            <div className='profile_portlet_header'>
              <span>
                <i class="bi bi-geo-fill"></i>Address, Household, and Other Information
              </span>
            </div>  
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
            </Row><div className='form_divider'></div>

            <div className='profile_portlet_header'>
              <span>
                <i class="bi bi-person-fill-lock"></i>eBarangayConnect Login Credentials
              </span>
            </div>
            <Row>
              <Col md={12}>
                <InputField
                  label={'User ID'}
                  maxLength={25}
                  type={'text'}
                  value={UsersStore.enrollmentRequest.cd}
                  onChange={e => this.onChangeInputs('cd', e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <InputField
                  label={'Password'}
                  maxLength={25}
                  type='password'
                  value={UsersStore.enrollmentRequest.password}
                  onChange={e => this.onChangeInputs('password', e.target.value)}
                />
              </Col>
            </Row><div className='form_divider'></div>

            <div className='profile_btns'>
              <BaseButton
                label={'Back to Dashboard'}
                onClick={() => this.onClickToDashboard()}
                customClassName={'profile_to_dashboard'}
                hasIcon={true}
                icon={<i class="bi bi-arrow-left"></i>}
              />
              <BaseButton
                onClick={() => this.onClickSaveChanges()}
                label={'Save Changes'}
                customClassName={'profile_save'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  onClickToDashboard = () => {
    window.location.href="/dashboard";
  };

  onClickSaveChanges = () => {
    const { SettingsStore, UsersStore } = this.context.store;

    SettingsStore.showModal({
      type: 'update',
      headerTitle: 'Update Confirmation',
      valueToDisplay: 'yourself',
      data: UsersStore.enrollmentRequest,
      additionalBtn: (data, closeModal) => (
        <BaseButton
          customClassName="btn_update"
          label="Save"
          onClick={() => this.onClickDelete(data, closeModal)}
        />
      )
    });
  };

  render() {
    return this.getMyProfile();
  }
}

MyProfilePanel.contextType = StoreContext;

export default observer(MyProfilePanel);