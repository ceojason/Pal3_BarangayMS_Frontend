import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseImageSlider from '../base/BaseImageSlider/BaseImageSlider';
import BaseAccordion from '../base/BaseAccordion/BaseAccordion';
import QuickActions from '../QuickActions/QuickActions';
import DashboardLogsCard from '../DashboardLogsCard/DashboardLogsCard';
import DashboardAnncCard from '../DashboardAnncCard/DashboardAnncCard';
import DashboardEmergencyHotline from '../DashboardEmergencyHotline/DashboardEmergencyHotline';

class MyDashboard extends Component {
  constructor(props) {
    super(props);
  }

  getMyDashboard = () => {
    return (
      <Fragment>
        {this.dashboardHdr()}
        {this.getDashboardDetails()}
      </Fragment>
    );
  };

  dashboardHdr = () => {
    const { SessionStore } = this.context.store;
    let currentUser = SessionStore.currentUser;

    return (
      <div className='body_container'>
        <div className="dashboard_hdr">
          <div className="left_panel">

            <div className="dashboard_title_row">
              <i className="bi bi-house-door-fill"></i>
              <h2>Dashboard</h2>

              <div className="user_badge">
                {currentUser?.roleDscp}
              </div>
            </div>

            <p className="dashboard_desc">
              Welcome back, {currentUser.firstNm}! Check your latest news and updates with your eBarangayConnect portal!
            </p>
          </div>

          <div className="right_panel">
            <div className="dt_time_panel">
              <i className="bi bi-calendar-event-fill"></i>
              <span>Today is {currentUser?.currentDtAndTime}</span>
            </div>
          </div>
        </div>

        <div className='dashboard_quick_actions'>
          <QuickActions isAdmin={false} />
        </div>
      </div>
    );
  };

  getDashboardDetails = () => {
    const { DashboardStore } = this.context.store;

    return (
      <div className='cards_ctr'>
        <div className='cards_ctr_hdr'>

        </div>

        <div className='grid_ctr'>
          <div>
            <DashboardAnncCard header={"Today's Announcement"} data={DashboardStore.data.announcementList} />
            <DashboardEmergencyHotline header={"Emergency Hotlines"} data={DashboardStore.data.hotlineList} />
          </div>
          <div>
            <DashboardLogsCard header={'My Recent Activities'} data={DashboardStore.data.logsList} />
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
