import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import logo from '../../assets/images/logo.png';
import { Col, Row } from 'react-bootstrap';
import InputField from '../base/InputField/InputField';
import BaseButton from '../base/BaseButton/BaseButton';

class ResetUserPanel extends Component {
  constructor(props) {
    super(props);
  }

  getResetUserForm = () => {
    const { UsersStore, SettingsStore } = this.context.store;

    return (
      <div className='reset_user_form'>

        <div className='header'>
          <span>
            {'Reset User Form'}
          </span>
          <span>
            <img src={logo} />
          </span>
        </div>

        {SettingsStore.showSuccessPanel && (
          <div className='my_profile_changes_saved_banner'>
            <span><i class="bi bi-check-circle-fill"></i>{SettingsStore.successMsg.ackMessage}</span>
          </div>
        )}
        {SettingsStore.showErrorPanel && (
          <div className='my_profile_changes_error_banner'>
            <span><i class="bi bi-exclamation-circle-fill"></i>{SettingsStore.errorList[0]}</span>
          </div>
        )}

        <div>
          <Row>
            <Col md={6}>
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

            
            <Col md={6}>
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
          </Row>

          <Row>
            <Col md={12}>
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
          </Row>
        </div>

        <div className='profile_btns'>
          <BaseButton
            label={'Back to Login'}
            onClick={() => this.onClickToDashboard()}
            customClassName={'profile_to_dashboard'}
            hasIcon={true}
            icon={<i class="bi bi-arrow-left"></i>}
          />
          <BaseButton
            onClick={() => this.onClickSaveChanges()}
            label={'Proceed'}
            customClassName={'profile_save'}
          />
        </div>
      </div>
    );
  };

  onClickToDashboard = () => {
    window.location.href="/login";
  };

  onClickSaveChanges = () => {
    const { SettingsStore, UsersStore } = this.context.store;

    SettingsStore.showModal({
      type: 'update',
      headerTitle: 'Reset User Credentials',
      valueToDisplay: 'yourself',
      data: UsersStore.enrollmentRequest,
      additionalBtn: (data, closeModal) => (
        <BaseButton
          customClassName="btn_update"
          label="Reset"
          onClick={() => this.onClickReset(data, closeModal)}
        />
      )
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

  onClickReset = (data, closeModal) => {
    const { SettingsStore, UsersStore } = this.context.store;
    
    window.scrollTo(0, 0);
    data.hasNoSession = true;
    UsersStore.resetUserNoSession(data, res => {
      UsersStore.reset();
      SettingsStore.showSuccessPanel = true;
      SettingsStore.successMsg = {
        ackMessage: res.ackMessage
      };
      setTimeout(() => {
        SettingsStore.showSuccessPanel = false;
        SettingsStore.successMsg = {};
      }, 5000);
    }, error => {
      UsersStore.reset();
      SettingsStore.showErrorPanel = true;
      SettingsStore.errorList = error;
      setTimeout(() => {
        SettingsStore.showErrorPanel = false;
        SettingsStore.errorList = [];
      }, 5000);
    });
    closeModal && closeModal();
  };

  render() {
    return (
      <Fragment>
        {this.getResetUserForm()}
      </Fragment>
    );
  };
};

ResetUserPanel.contextType = StoreContext;

export default observer(ResetUserPanel);
