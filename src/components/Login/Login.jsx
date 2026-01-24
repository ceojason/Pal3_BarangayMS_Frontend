import React, { Component, Fragment } from 'react';
import { Navigate } from 'react-router-dom'; // <-- for redirect
import logo from '../../assets/images/logo.png';
import StoreContext from '../../store/StoreContext';
import InputField from '../base/InputField/InputField';
import { Col, Row } from 'react-bootstrap';
import { observer } from 'mobx-react';
import BaseButton from '../base/BaseButton/BaseButton';
import { buildClassNames } from '../../utils/ClassUtils';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false, // <-- add redirect flag
    };
  }

  onClickLogin = async (e) => {
    const { LoginStore, SettingsStore, SessionStore } = this.context.store;
    e.preventDefault();
    SettingsStore.isLoading=true;

    LoginStore.login(
      LoginStore.loginRequest,
      res => {
        SettingsStore.isLoading=false;
        SessionStore.setUser(res);       // set user in MobX store
        console.log("current user -> ", SessionStore.currentUser);

        // Redirect to dashboard
        this.setState({ redirect: true });
      },
      err => {
        SettingsStore.isLoading=false;
        SettingsStore.showError(err);
      }
    );
  };

  onChangeInputs = (fieldId, val) => {
    const { LoginStore } = this.context.store;

    LoginStore.loginRequest[fieldId] = val ?? null;
  };

  loginForm = () => {
    const { LoginStore, SettingsStore } = this.context.store;

    // Redirect if login successful
    if (this.state.redirect) {
      return <Navigate to="/dashboard" replace />;
    }

    return (
      <Fragment>
        {SettingsStore.isLoading ? <div className='api-backdrop' /> : null}

        <div className={buildClassNames('login_ctr')}>
          <div className='login_hdr'>
            <div className='login_hdr_main'>
              <img src={logo} alt='eastLogoHere' />
              <span className='main_hdr'>eBarangayConnect</span>
            </div>
            <span className='sec_hdr'>Your Community, Your Voice.</span>
          </div>

          {LoginStore.error && (
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-shield-fill-exclamation"></i>{LoginStore.error}
            </div>
          )}

          <form onSubmit={this.onClickLogin} className='login_form'>
            <div className='login_body'>
              <Row>
                <Col md={12}>
                  <InputField
                    type='text'
                    maxLength={32}
                    isRequired
                    placeholder='Enter User ID'
                    label='User ID'
                    value={LoginStore.loginRequest.cd}
                    onChange={e => this.onChangeInputs('cd', e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <InputField
                    type='password'
                    isRequired
                    placeholder='Enter Password'
                    label='Password'
                    value={LoginStore.loginRequest.password}
                    onChange={e => this.onChangeInputs('password', e.target.value)}
                  />
                </Col>
              </Row>

              <div className='login_footer'>
                <BaseButton
                  type='submit'
                  label='Log In'
                />
                <span>
                  Forgot password? Click <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">here.</a>
                </span>
              </div>
            </div>
          </form>

          <div className='login_btm_links'>
            <span>
              <i className="bi bi-c-circle"></i> Copyright 2026 - Barangay Paliparan III
            </span>
            <span className='link_divider'>|</span>
            <span className='portal_nm'>
              eBarangayConnect
            </span>
            <span className='link_divider'>|</span>
            <span className='web_link'>
              <a href='https://cavite.gov.ph/home/cities-and-municipalities/city-of-dasmarinas/' target='_blank'>City of Dasmariñas</a>
            </span>
          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    return this.loginForm();
  }
};

Login.contextType = StoreContext;

export default observer(Login);