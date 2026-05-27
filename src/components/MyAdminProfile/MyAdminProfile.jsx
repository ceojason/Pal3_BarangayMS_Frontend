import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import { Col, Row } from 'react-bootstrap';
import InputField from '../base/InputField/InputField';
import SelectField from '../base/SelectField/SelectField';
import BaseButton from '../base/BaseButton/BaseButton';

class MyAdminProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
      genderList: [],
      phaseList: [],
      imageSaved: false,
      updateSaved: false,
      profileData: null,
    };
  }

  componentDidMount() {
    const { SessionStore, AdminEnrollmentStore, UsersStore } = this.context.store;
    const userId = SessionStore.currentUser?.userId;

    if (!userId) return;

    AdminEnrollmentStore.getAdminProfileImage(userId).then((imageUrl) => {
      if (imageUrl) this.setState({ profileImage: imageUrl });
    });

    UsersStore.getPhaseList().then(list => {
      this.setState({ phaseList: list.purokList });
    });

    UsersStore.getGenderList().then(list => {
      this.setState({ genderList: list.genderListStr });
    });

    AdminEnrollmentStore.findAdmindataById(userId).then(data => {
      AdminEnrollmentStore.enrollmentRequest = data;
      this.setState({ profileData: data });
    });
  }

  handleImageUpload = (e) => {
    const { UsersStore, SessionStore } = this.context.store;
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const maxSize = 1024;
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        } else if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(async (blob) => {
          const base64 = await this.blobToBase64(blob);

          this.setState({ profileImage: base64, imageSaved: true });

          const { AdminEnrollmentStore, SessionStore } = this.context.store;

          const userId = SessionStore.currentUser?.userId;

          const compressedFile = new File([blob], "profile.jpg", {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          UsersStore.uploadImageToServer(compressedFile, userId)
            .then(() => {
              console.log("Upload success");
            })
            .catch((err) => {
              console.error("Upload failed", err);
            });

          setTimeout(() => this.setState({ imageSaved: false }), 8000);
        }, 'image/jpeg', 0.7);
      };
    };

    reader.readAsDataURL(file);
  };

  blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  onChangeInputs = (fieldId, val) => {
    const { AdminEnrollmentStore } = this.context.store;
    AdminEnrollmentStore.enrollmentRequest[fieldId] =
      val != null && val.trim() !== '' ? val : null;
  };

  onChangeSelect = (fieldId, val) => {
    const { AdminEnrollmentStore } = this.context.store;
    AdminEnrollmentStore.enrollmentRequest[fieldId] = val?.key ?? null;
  };

  onClickToDashboard = () => {
    window.location.href = "/dashboard";
  };

  onClickSaveChanges = () => {
    const { SettingsStore, AdminEnrollmentStore } = this.context.store;

    SettingsStore.showModal({
      type: 'update',
      headerTitle: 'Update Confirmation',
      valueToDisplay: 'yourself',
      data: AdminEnrollmentStore.enrollmentRequest,
      additionalBtn: (data, closeModal) => (
        <BaseButton
          customClassName="btn_update"
          label="Save"
          onClick={() => this.onClickUpdate(closeModal)}
        />
      )
    });
  };

  onClickUpdate = (closeModal) => {
    const { SettingsStore, AdminEnrollmentStore } = this.context.store;

    window.scrollTo(0, 0);

    AdminEnrollmentStore.validateAndUpdate(
      AdminEnrollmentStore.enrollmentRequest,
      (res) => {
        SettingsStore.showSuccessPanel = true;
        SettingsStore.successMsg = { ackMessage: res.ackMessage };

        setTimeout(() => {
          SettingsStore.showSuccessPanel = false;
          SettingsStore.successMsg = {};
        }, 10000);
      },
      (error) => {
        SettingsStore.showErrorPanel = true;
        SettingsStore.errorList = error;

        setTimeout(() => {
          SettingsStore.showErrorPanel = false;
          SettingsStore.errorList = [];
        }, 10000);
      }
    );

    AdminEnrollmentStore.enrollmentRequest.cd = null;
    AdminEnrollmentStore.enrollmentRequest.password = null;

    closeModal && closeModal();
  };

  adminProfile = () => {
    const { profileImage, genderList, phaseList, imageSaved } = this.state;
    const { SessionStore, SettingsStore, AdminEnrollmentStore } = this.context.store;

    const user = SessionStore.currentUser;
    if (!user) return null;

    return (
      <Fragment>
        <div
          className="my_profile_ctr"
          style={{
            margin: '30px auto',
            padding: '0 15px'
          }}
        >

          {/* ALERTS */}
          {SettingsStore.showSuccessPanel && (
            <div className='my_profile_changes_saved_banner' style={alertSuccess}>
              <i className="bi bi-check-circle-fill" style={{ marginRight: 8 }} />
              {SettingsStore.successMsg.ackMessage}
            </div>
          )}

          {SettingsStore.showErrorPanel && (
            <div style={alertError}>
              <i className="bi bi-exclamation-circle-fill" style={{ marginRight: 8 }} />
              {SettingsStore.errorList[0]}
            </div>
          )}

          {/* HEADER CARD */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>

              <div style={{ position: 'relative' }}>
                {profileImage ? (
                  <img src={profileImage} style={avatarStyle} />
                ) : (
                  <i className="bi bi-person-circle" style={avatarIcon} />
                )}

                {imageSaved && (
                  <div style={savedTag}>Saved ✓</div>
                )}

                <label style={uploadLabel}>
                  Change Photo
                  <input type="file" hidden onChange={this.handleImageUpload} />
                </label>
              </div>

              <div>
                <div style={nameStyle}>
                  {this.state.profileData?.firstNm}{' '}
                  {this.state.profileData?.lastNm}
                </div>

                <div style={subText}>Admin Account • eBarangayConnect</div>

                <div style={mutedText}>
                  Active since: {this.state.profileData?.lastLoginDtString}
                </div>
              </div>

            </div>
          </div>

          {/* FORM CARD */}
          <div style={cardStyle}>

            <SectionTitle text="Personal Information" />

            <Row>
              <Col md={3}><InputField label="First Name" value={AdminEnrollmentStore.enrollmentRequest.firstNm} onChange={e => this.onChangeInputs('firstNm', e.target.value)} onlyLetterSp /></Col>
              <Col md={3}><InputField label="Middle Name" value={AdminEnrollmentStore.enrollmentRequest.middleNm} onChange={e => this.onChangeInputs('middleNm', e.target.value)} onlyLetterSp /></Col>
              <Col md={3}><InputField label="Last Name" value={AdminEnrollmentStore.enrollmentRequest.lastNm} onChange={e => this.onChangeInputs('lastNm', e.target.value)} onlyLetterSp /></Col>
              <Col md={3}><InputField label="Suffix" value={AdminEnrollmentStore.enrollmentRequest.suffix} onChange={e => this.onChangeInputs('suffix', e.target.value)} /></Col>
            </Row>

            <Row style={{ marginTop: 10 }}>
              <Col md={3}>
                <SelectField
                  label="Gender"
                  options={genderList}
                  value={AdminEnrollmentStore.enrollmentRequest.gender}
                  onChange={e => this.onChangeSelect('gender', e.target.value)}
                />
              </Col>
            </Row>

            <Divider />

            <SectionTitle text="Contact Information" />

            <Row>
              <Col md={6}>
                <InputField label="Contact Number" value={AdminEnrollmentStore.enrollmentRequest.mobileNo} onChange={e => this.onChangeInputs('mobileNo', e.target.value)} isMobileNumber />
              </Col>
              <Col md={6}>
                <InputField label="Email Address" value={AdminEnrollmentStore.enrollmentRequest.emailAddress} onChange={e => this.onChangeInputs('emailAddress', e.target.value)} />
              </Col>
            </Row>

            <Divider />

            <SectionTitle text="Address Information" />

            <Row>
              <Col md={8}>
                <InputField label="Home Address" value={AdminEnrollmentStore.enrollmentRequest.homeAddress} onChange={e => this.onChangeInputs('homeAddress', e.target.value)} />
              </Col>
              <Col md={4}>
                <SelectField
                  label="Purok"
                  options={phaseList}
                  value={AdminEnrollmentStore.enrollmentRequest.phaseKey}
                  onChange={e => this.onChangeSelect('phaseKey', e.target.value)}
                />
              </Col>
            </Row>

            {/* LOGIN CARD (FIXED - NOT REMOVED) */}
            <div style={loginCardStyle}>

              <div style={loginHeaderStyle}>
                <i className="bi bi-person-fill-lock"></i>
                <span>eBarangayConnect Login Credentials</span>
              </div>

              <Row>
                <Col md={12}>
                  <InputField
                    label="User ID"
                    maxLength={25}
                    type="text"
                    value={AdminEnrollmentStore.enrollmentRequest.cd}
                    onChange={e => this.onChangeInputs('cd', e.target.value)}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <InputField
                    label="Password"
                    maxLength={25}
                    type="password"
                    value={AdminEnrollmentStore.enrollmentRequest.password}
                    onChange={e => this.onChangeInputs('password', e.target.value)}
                  />
                </Col>
              </Row>

            </div>

            {/* BUTTONS */}
            <div style={buttonRow} className='profile_btns'>
              <BaseButton
                label="Back to Dashboard"
                onClick={this.onClickToDashboard}
                customClassName="profile_to_dashboard"
                hasIcon
                icon={<i className="bi bi-arrow-left" />}
              />

              <BaseButton
                label="Save Changes"
                onClick={this.onClickSaveChanges}
                customClassName="profile_save"
              />
            </div>

          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    return this.adminProfile();
  }
}

MyAdminProfile.contextType = StoreContext;
export default observer(MyAdminProfile);

/* ================= STYLES ================= */

const cardStyle = {
  background: '#fff',
  borderRadius: 16,
  padding: 22,
  marginBottom: 18,
  boxShadow: '0 6px 20px rgba(0,0,0,0.06)'
};

const alertSuccess = {
  background: '#ecfdf5',
  color: '#065f46',
  padding: '12px 16px',
  borderRadius: 10,
  marginBottom: 12,
  fontWeight: 500
};

const alertError = {
  background: '#fef2f2',
  color: '#991b1b',
  padding: '12px 16px',
  borderRadius: 10,
  marginBottom: 12,
  fontWeight: 500
};

const avatarStyle = {
  width: 90,
  height: 90,
  borderRadius: '50%',
  objectFit: 'cover',
  border: '3px solid #e5e7eb'
};

const avatarIcon = {
  fontSize: 90,
  color: '#9ca3af'
};

const savedTag = {
  position: 'absolute',
  bottom: -10,
  left: 0,
  right: 0,
  textAlign: 'center',
  fontSize: 12,
  color: '#16a34a',
  fontWeight: 600
};

const uploadLabel = {
  display: 'block',
  marginTop: 8,
  fontSize: 12,
  color: '#2563eb',
  cursor: 'pointer',
  textAlign: 'center'
};

const nameStyle = {
  fontSize: 22,
  fontWeight: 700,
  color: '#111827'
};

const subText = {
  fontSize: 13,
  color: '#6b7280',
  marginTop: 4
};

const mutedText = {
  fontSize: 12,
  color: '#9ca3af',
  marginTop: 6
};

const loginCardStyle = {
  background: '#f9fafb',
  borderRadius: 14,
  padding: 18,
  marginTop: 20,
  border: '1px solid #eee'
};

const loginHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontWeight: 700,
  marginBottom: 12
};

const buttonRow = {
  marginTop: 25,
  display: 'flex',
  // justifyContent: 'flex-end',
  gap: 10,
  flexWrap: 'wrap'
};

const SectionTitle = ({ text }) => (
  <div style={{ fontWeight: 700, marginBottom: 15, fontSize: 15, color: '#111827' }}>
    {text}
  </div>
);

const Divider = () => (
  <hr style={{ margin: '22px 0', borderColor: '#eee' }} />
);