import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import DashboardCard from '../DashboardCard/DashboardCard';
import MyDashboard from '../MyDashboard/MyDashboard';
import BaseImageSlider from '../base/BaseImageSlider/BaseImageSlider';
import QuickActions from '../QuickActions/QuickActions';
import DashboardCalendar from '../DashboardCalendar/DashboardCalendar';

class MyAdminDashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    const { DashboardStore, SessionStore } = this.context.store;
    SessionStore.isLoading=true;
    if (SessionStore.currentUser!=null && SessionStore.currentUser.roleKey!=null) {
      DashboardStore.getDashboardData(SessionStore.currentUser!=null ? SessionStore.currentUser.roleKey : null).then(data => {
        DashboardStore.data=data;
      });
    }
  };

  getDashboardDisplay = () => {
    const { DashboardStore } = this.context.store;

    return (
      <Fragment>
        {this.dashboardHdr()}
        <div className='cards_ctr'>
          <div className='cards_ctr_hdr'>
            
          </div>
          <div className='grid_ctr'>
            <div>
              <div className='col_one'>
                <DashboardCard
                  header={'Users'}
                  icon={<i class="bi bi-people-fill"></i>}
                  className={'gradient_green'}
                  data={DashboardStore.data.paramCount1}
                  label={DashboardStore.data.paramLabel1}
                />
              </div>
            </div>

            <div>
              <div className='col_two'>
                <DashboardCard
                  header={'Active Announcement'}
                  icon={<i class="bi bi-send-arrow-up-fill"></i>}
                  className={'gradient_blue'}
                  data={DashboardStore.data.paramCount2}
                  label={DashboardStore.data.paramLabel2}
                />
              </div>
            </div>

            <div>
              <div className='col_three'>
                <DashboardCard
                  header={'Pending Document Requests'}
                  icon={<i class="bi bi-file-earmark-pdf-fill"></i>}
                  className={'gradient_orange'}
                  data={DashboardStore.data.paramCount3}
                  label={DashboardStore.data.paramLabel3}
                />
              </div>
            </div>
          </div>
        </div>
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
                <h2>Admin Dashboard</h2>

                <div className="user_badge">
                  {currentUser?.roleDscp}
                </div>
              </div>

              <p className="dashboard_desc">
                Welcome back, {currentUser.firstNm}! Manage residents, announcements, and document requests in one place.
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
            <QuickActions isAdmin={true} />
          </div>
        </div>
    );
  };

  render() {
    const { SessionStore, DashboardStore } = this.context.store;
    let data = DashboardStore.data!=null && DashboardStore.data.announcementList;
    if (SessionStore.currentUser!=null && SessionStore.currentUser.roleKey!==2) return <MyDashboard data={data} />;

    return this.getDashboardDisplay();
  };
};

MyAdminDashboard.contextType = StoreContext;

export default observer(MyAdminDashboard);
