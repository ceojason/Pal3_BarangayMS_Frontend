import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import { Col, Row } from 'react-bootstrap';
import { ViewField } from '../base/ViewPortlet/ViewPortlet';
import ViewPortlet from '../base/ViewPortlet/ViewPortlet';
import InputField from '../base/InputField/InputField';
import SelectField from '../base/SelectField/SelectField';
import BaseButton from '../base/BaseButton/BaseButton';
import MyAdminProfile from '../MyAdminProfile/MyAdminProfile';

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
      imageSaved: false,
      brgyPositionList: [],
    };
  }

  componentDidMount() {
    const { SessionStore, UsersStore } = this.context.store;
    let currentUser = SessionStore.currentUser;
    let isAdminUser = currentUser.roleKey === 2;

    const userId = SessionStore.currentUser?.userId;
    if (!isAdminUser) {
      if (userId) {
        // const savedImage = localStorage.getItem(`profileImage_${userId}`);
        // if (savedImage) {
        //   this.setState({ profileImage: savedImage });
        // }
        UsersStore.getProfileImage(userId).then((imageUrl) => {
          if (imageUrl) {
            this.setState({ profileImage: imageUrl });
          }
        });

        UsersStore.getBrgyPositionList().then((list) => {
          this.setState({ brgyPositionList: list.brgyPositionList });
        });

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
  };

  handleImageUpload = (e) => {
    const { UsersStore, SessionStore, SettingsStore } = this.context.store;
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const maxWidth = 1024;
        const maxHeight = 1024;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          async (blob) => {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });

            const base64Image = await this.blobToBase64(blob);

            this.setState({ profileImage: base64Image, imageSaved: true });

            const userId = SessionStore.currentUser?.userId;
            UsersStore.uploadImageToServer(compressedFile, userId)
              .then(() => {
                SettingsStore.showSuccessPanel = true;
                SettingsStore.successMsg.ackMessage = 'Your profile photo was saved successfully!';
                setTimeout(() => {
                  SettingsStore.showSuccessPanel = false;
                  SettingsStore.successMsg = {};
                }, 10000);
              })
              .catch((err) => {
                console.error('Upload failed', err);
              });

            setTimeout(() => this.setState({ imageSaved: false }), 10000);
          },
          'image/jpeg',
          0.7
        );
      };
    };
    reader.readAsDataURL(file);
  };

  blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  onChangeInputs = (fieldId, val) => {
    const { UsersStore } = this.context.store;

    if (val != null && val.trim() !== '') {
      UsersStore.enrollmentRequest[fieldId] = val;
    } else {
      UsersStore.enrollmentRequest[fieldId] = null;
    }
  };

  onChangeSelect = (fieldId, val) => {
    const { UsersStore } = this.context.store;

    if (val != null && val.key != null) {
      UsersStore.enrollmentRequest[fieldId] = val.key;
    } else {
      UsersStore.enrollmentRequest[fieldId] = null;
    }
  };

  renderProfileHeader = () => {
    const { UsersStore } = this.context.store;
    const { profileImage, imageSaved } = this.state;

    return (
      <div style={styles.card}>
        <div style={styles.row}>

          {/* LEFT: AVATAR */}
          <div style={styles.avatarWrap}>
            {profileImage ? (
              <img src={profileImage} alt="Profile" style={styles.avatar} />
            ) : (
              <i className="bi bi-person-circle" style={styles.avatarIcon} />
            )}

            <label style={styles.upload}>
              Change Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={this.handleImageUpload}
              />
            </label>
          </div>

          {/* RIGHT: INFO */}
          <div style={styles.info}>

            <div style={styles.name}>
              {UsersStore.enrollmentRequest.firstNm}{' '}
              {UsersStore.enrollmentRequest.lastNm}
            </div>

            <div style={styles.tags}>
              <span style={styles.tagGreen}>Resident Account</span>
              <span style={styles.tagGray}>eBarangayConnect Member</span>
            </div>

            <div style={styles.meta}>
              <span style={styles.metaLabel}>Active since</span>{' '}
              <span style={styles.metaValue}>
                {UsersStore.enrollmentRequest.lastLoginDtString}
              </span>
            </div>

          </div>

        </div>
      </div>
    );
  };

  getMyProfile = () => {
    const { genderList, civilStatusList, phaseList, yesNoList, residentTypeList, profileImage, brgyPositionList } = this.state;
    const { SessionStore, UsersStore, SettingsStore } = this.context.store;

    const currentUser = SessionStore.currentUser;

    let members = UsersStore.enrollmentRequest!=null && UsersStore.enrollmentRequest.householdMembers!=null && UsersStore.enrollmentRequest.householdMembers.length > 3
      ? UsersStore.enrollmentRequest.householdMembersString.substring(0, 50) + '...'
      : UsersStore.enrollmentRequest.householdMembersString;

    if (!currentUser) return null;

    return (
      <Fragment>
        {SettingsStore.showSuccessPanel && (
          <div className='my_profile_changes_saved_banner'>
            <span>
              <i class="bi bi-check-circle-fill"></i>
              {/* {SettingsStore.successMsg.ackMessage} */}
              {'Your information was updated successfully!'}
            </span>
          </div>
        )}

        {SettingsStore.showErrorPanel && (
          <div className='my_profile_changes_error_banner'>
            <span>
              <i class="bi bi-exclamation-circle-fill"></i>
              {SettingsStore.errorList[0]}
            </span>
          </div>
        )}

        <div
          className="my_profile_ctr"
          style={{
            margin: '0 auto',
            padding: '20px 10px 60px 10px'
          }}
        >
          {/* PROFILE HEADER */}
          {this.renderProfileHeader()}

          <div className='profile_body'>

            {/* PERSONAL INFORMATION */}
            <div className='profile_section_card'>
              <div className='profile_portlet_header'>
                <span>
                  <i class="bi bi-person-circle"></i>
                  Personal Information
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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

                <Col md={3}>
                  <SelectField
                    label={'Gender'}
                    isRequired={true}
                    options={genderList}
                    value={UsersStore.enrollmentRequest.gender}
                    onChange={e => this.onChangeSelect('gender', e.target.value)}
                    disabled={true}
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
                    disabled={true}
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
                    disabled
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
                    disabled={true}
                  />
                </Col>

                {UsersStore.enrollmentRequest.isBrgyOfficial != null &&
                  UsersStore.enrollmentRequest.isBrgyOfficial == 0 && (
                    <Col md={3}>
                      <SelectField
                        label={'Barangay Position'}
                        isRequired={true}
                        options={brgyPositionList}
                        value={UsersStore.enrollmentRequest.brgyPositionKey}
                        onChange={e => this.onChangeSelect('brgyPositionKey', e.target.value)}
                        disabled
                      />
                    </Col>
                  )}
              </Row>
            </div>

            {/* ADDRESS */}
            <div className='profile_section_card'>
              <div className='profile_portlet_header'>
                <span>
                  <i class="bi bi-telephone-forward-fill"></i>
                  Home Address & Contact Information
                </span>
              </div>

              <Row>
                <Col md={3}>
                  <InputField
                    label={'Block/House No.'}
                    maxLength={255}
                    isRequired={true}
                    type={'text'}
                    value={UsersStore.enrollmentRequest.block}
                    onChange={e => this.onChangeInputs('block', e.target.value)}
                    disabled
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
                    disabled
                  />
                </Col>

                <Col md={3}>
                  <InputField
                    label={'Street'}
                    maxLength={255}
                    type={'text'}
                    value={UsersStore.enrollmentRequest.street}
                    onChange={e => this.onChangeInputs('street', e.target.value)}
                    disabled
                  />
                </Col>

                <Col md={3}>
                  <SelectField
                    label={'Purok'}
                    isRequired={true}
                    options={phaseList}
                    value={UsersStore.enrollmentRequest.phaseKey}
                    onChange={e => this.onChangeSelect('phaseKey', e.target.value)}
                    disabled
                  />
                </Col>
              </Row>

              <Row>
                <Col md={3}>
                  <SelectField
                    label={'Is Household Head?'}
                    isRequired={true}
                    options={yesNoList}
                    value={UsersStore.enrollmentRequest.isHouseholdHead}
                    onChange={e => this.onChangeSelect('isHouseholdHead', e.target.value)}
                    disabled
                  />
                </Col>
                <Col md={4}>
                  <ViewField
                    label={'Household Description'}
                    value={UsersStore.enrollmentRequest.tempHouseholdForSave}
                    customClassName={'custom_viewfield'}
                    icon={<i class="bi bi-house-up-fill"></i>}
                  />
                </Col>
                <Col md={5}>
                  <ViewField
                    label={'Household Members'}
                    value={members}
                    customClassName={'with_highlight'}
                    icon={<i class="bi bi-person-check-fill"></i>}
                    title={'Household Members'}
                    modalContent={UsersStore.enrollmentRequest.householdMembers}
                    isObjectList={true}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={3}>
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

                <Col md={3}>
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
            </div>

            {/* LOGIN */}
            <div className='profile_section_card'>
              <div className='profile_portlet_header'>
                <span>
                  <i class="bi bi-person-fill-lock"></i>
                  eBarangayConnect Login Credentials
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
              </Row>
            </div>

            {/* BUTTONS */}
            <div
              className='profile_section_card'
              style={{
                paddingTop: '24px',
                paddingBottom: '24px'
              }}
            >
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
      </Fragment>
    );
  };

  onClickToDashboard = () => {
    window.location.href = "/dashboard";
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
          onClick={() => this.onClickUpdate(data, closeModal)}
        />
      )
    });
  };

  onClickUpdate = (data, closeModal) => {
    const { SettingsStore, UsersStore } = this.context.store;

    window.scrollTo(0, 0);
    UsersStore.validateAndUpdate(UsersStore.enrollmentRequest, res => {
      SettingsStore.showSuccessPanel = true;
      SettingsStore.successMsg = {
        ackMessage: res.ackMessage
      };
      setTimeout(() => {
        SettingsStore.showSuccessPanel = false;
        SettingsStore.successMsg = {};
      }, 10000);
    }, error => {
      SettingsStore.showErrorPanel = true;
      SettingsStore.errorList = error;
      setTimeout(() => {
        SettingsStore.showErrorPanel = false;
        SettingsStore.errorList = [];
      }, 10000);
    });
    UsersStore.enrollmentRequest.cd = null;
    UsersStore.enrollmentRequest.password = null;
    closeModal && closeModal();
  };

  render() {
    const { SessionStore } = this.context.store;
    let currentUser = SessionStore.currentUser;
    let isAdminUser = currentUser.roleKey === 2;

    if (isAdminUser) return <MyAdminProfile />;
    return this.getMyProfile();
  }
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: '24px',
    padding: '35px',
    marginBottom: '25px',
    boxShadow: '0 6px 24px rgba(0,0,0,0.09)',
  },

  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
    flexWrap: 'wrap',
  },

  avatarWrap: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '25px',
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: '50%',
    objectFit: 'cover',
  },

  avatarIcon: {
    fontSize: 90,
    color: '#9ca3af',
  },

  upload: {
    fontSize: 13,
    fontWeight: 600,
    color: '#05714B',
    cursor: 'pointer',
  },

  saved: {
    position: 'absolute',
    bottom: -50,
    background: 'rgba(16,185,129,0.15)',
    color: 'var(--main-green)',
    padding: '4px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    marginBottom: '20px',
  },

  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  name: {
    fontSize: 32,
    fontWeight: 700,
    color: '#5C5757',
  },

  tags: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },

  tagGreen: {
    background: 'rgba(16,185,129,0.12)',
    color: 'var(--main-green)',
    padding: '8px 14px',
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 600,
  },

  tagGray: {
    background: '#f3f4f6',
    color: '#4b5563',
    padding: '8px 14px',
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 600,
  },

  meta: {
    marginTop: 8,
    fontSize: 12,
    color: 'rgb(156, 163, 175)'
  },

  metaLabel: {
    fontWeight: 600,
  },

  metaValue: {
    marginLeft: 4,
  },
};

MyProfilePanel.contextType = StoreContext;

export default observer(MyProfilePanel);