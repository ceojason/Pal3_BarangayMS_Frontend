import React, { Component } from 'react';
import east_logo from '../../assets/images/east_logo.png';
import StoreContext from '../../store/StoreContext';
import InputField from '../base/InputField/InputField';
import { Col, Row } from 'react-bootstrap';
import { observer } from 'mobx-react';
import BaseButton from '../base/BaseButton/BaseButton';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  onClickLogin = async (e) => {
    const { LoginStore, SettingsStore, SessionStore } = this.context.store;
    e.preventDefault();
    LoginStore.login(LoginStore.loginRequest, res => {
      SessionStore.setUser(res);
    }, err => {
        SettingsStore.showError(err);
    });
  };


  onChangeInputs = (fieldId, val) => {
    const { LoginStore } = this.context.store;

    if (val!=null) {
      LoginStore.loginRequest[fieldId]=val;
    }else{
      LoginStore.loginRequest[fieldId]=null;
    }
  };

  loginForm = () => {
    const { LoginStore } = this.context.store;

    return (
      <div className='login_ctr'>
        <div className='login_hdr'>
          <div className='login_hdr_main'>
            <img src={east_logo} alt='eastLogoHere' />
            <span className='main_hdr'>EASTudent PORTAL</span>
          </div>

          <span className='sec_hdr'>Don't let your grades define your future</span>
        </div>

        {LoginStore.error!=null && (
          <div className="alert alert-danger" role="alert">
            <i class="bi bi-shield-fill-exclamation"></i>{LoginStore.error}
          </div>
        )}

        <form onSubmit={this.onClickLogin} className='login_form'>
          <div className='login_body'>
            <Row>
              <Col md={12}>
                <InputField
                  type={'text'}
                  maxLength={32}
                  isRequired={true}
                  placeholder={'Enter User ID/LRN'}
                  label={'User ID/LRN'}
                  value={LoginStore.loginRequest.cd}
                  onChange={e => this.onChangeInputs('cd', e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <InputField
                  type={'password'}
                  isRequired={true}
                  placeholder={'Enter Password'}
                  label={'Password'}
                  value={LoginStore.loginRequest.password}
                  onChange={e => this.onChangeInputs('password', e.target.value)}
                />
              </Col>
            </Row>

            <div className='login_footer'>
              <BaseButton
                type={'submit'}
                label={'Log In'}
              />
              <span>
                Forgot password? Click <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">here.</a>
              </span>
            </div>
          </div>
        </form>

        <div className='login_btm_links'>
          <span className='web_link'>
            <a href='https://deihs.depeddasma.edu.ph/' target='_blank'>DEIHS Website</a>
          </span>
          <span className='link_divider'>|</span>
          <span className=''>
            <i class="bi bi-c-circle"></i> Copyright 2025 DEIHS Senior High School
          </span>
          <span className='link_divider'>|</span>
          <span className='portal_nm'>
            EASTudent Portal
          </span>
        </div>
      </div>
    );
  };

  render() {

    return this.loginForm();
  };
};

Login.contextType = StoreContext;

export default observer(Login);
