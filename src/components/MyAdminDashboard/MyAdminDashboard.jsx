import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import DashboardCard from '../DashboardCard/DashboardCard';
import MyDashboard from '../MyDashboard/MyDashboard';
import BaseImageSlider from '../base/BaseImageSlider/BaseImageSlider';

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
            <div className='col_one'>
              <DashboardCard
                header={'Users'}
                icon={<i class="bi bi-people-fill"></i>}
                className={'gradient_green'}
                data={DashboardStore.data.paramCount1}
                label={DashboardStore.data.paramLabel1}
              />
              <BaseImageSlider />
            </div>
            <div>
              <div className='col_two'>
                <DashboardCard
                  header={'Active Announcement'}
                  icon={<i class="bi bi-megaphone-fill"></i>}
                  className={'gradient_red'}
                  data={DashboardStore.data.paramCount2}
                  label={DashboardStore.data.paramLabel2}
                />
              </div>
            </div>
            <div>
              <div className='col_three'>
                <DashboardCard
                  header={'Pending Requests'}
                  icon={<i class="bi bi-file-earmark-word-fill"></i>}
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
          <div className='dashboard_hdr'>

            <div className='left_panel'>
              <div className='dashboard_display_system'>
                <i class="bi bi-house-door-fill"/>Welcome back, {currentUser.firstNm}!
                <div className='user_badge'>
                  <span>{currentUser!=null ? currentUser.roleDscp : ''}</span>
                </div>
              </div>

              <div className='dashboard_notifs'>
                <span>
                  Manage resident's account, create an announcement, and process document requests with eBarangayConnect!
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

  render() {
    const { SessionStore, DashboardStore } = this.context.store;
    let data = DashboardStore.data!=null && DashboardStore.data.announcementList;
    if (SessionStore.currentUser!=null && SessionStore.currentUser.roleKey!==2) return <MyDashboard data={data} />;

    return this.getDashboardDisplay();
  };
};

MyAdminDashboard.contextType = StoreContext;

export default observer(MyAdminDashboard);
