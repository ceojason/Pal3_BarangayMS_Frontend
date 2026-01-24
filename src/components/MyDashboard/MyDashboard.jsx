import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseImageSlider from '../base/BaseImageSlider/BaseImageSlider';
import BaseAccordion from '../base/BaseAccordion/BaseAccordion';

class MyDashboard extends Component {
  constructor(props) {
    super(props);
  }

  getMyDashboard = () => {
    return (
      <Fragment>
        {this.dashboardHdr()}
        {this.innerBody()}
      </Fragment>
    );
  };

  dashboardHdr = () => {
    const { SessionStore } = this.context.store;
    let currentUser = SessionStore.currentUser;

    return (
        <div className='body_container'>
          <div className='dashboard_hdr'>

            <div className='left_panel'>
              <div className='dashboard_display_system'>
                <span className='left_main_message'>
                  <i class="bi bi-house-door-fill"/>Welcome back, {currentUser.firstNm}!
                </span>
                <div className='user_badge'>
                  <span>{currentUser!=null ? currentUser.roleDscp : ''}</span>
                </div>
              </div>

              <div className='dashboard_notifs'>
                <span>
                  Manage your account, view announcement, and request barangay documents with eBarangayConnect!
                </span>
              </div>
            </div>

            <div className='right_panel'>
              <div className='dt_time_panel'>
                <span>
                  <i class="bi bi-calendar-event-fill"/>
                  Today is {currentUser.currentDtAndTime}
                </span>
              </div>
            </div>
          </div>
        </div>
    );
  };

  innerBody = () => {
    const { data } = this.props;

    return (
      <div className="dashboard container-fluid">
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <BaseImageSlider />
          </div>

          <div className="col-12 col-md-6">
            <BaseAccordion
              data={data}
              header={"Today's Announcement Bulletin"}
              noContentMsg={'No announcement found.'}
            />
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.getMyDashboard();
  }
};

MyDashboard.contextType = StoreContext;

export default observer(MyDashboard);
