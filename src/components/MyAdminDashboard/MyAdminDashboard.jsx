import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import DashboardCard from '../DashboardCard/DashboardCard';
import NoAccessCtr from '../base/NoAccessCtr/NoAccessCtr';

class MyAdminDashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  getDashboardDisplay = () => {
    return (
      <Fragment>
        {this.dashboardHdr()}
        <div className='cards_ctr'>
          <div className='cards_ctr_hdr'>
            
          </div>
          <div className='grid_ctr'>
            <div className='col_one'>
              <DashboardCard
                header={'Residents / Users'}
                icon={<i class="bi bi-people-fill"></i>}
                className={'gradient_green'}
              />
            </div>
            <div>
              <div className='col_two'>
                <DashboardCard
                  header={'Document Services'}
                  icon={<i class="bi bi-file-earmark-check-fill"></i>}
                  className={'gradient_red'}
                />
              </div>
            </div>
            <div>
              <div className='col_three'>
                <DashboardCard
                  header={'Pending Requests'}
                  icon={<i class="bi bi-journal-album"></i>}
                  className={'gradient_orange'}
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

              {/* <div className='dashboard_notifs'>
                <span>
                  See what's new? Click here.
                </span>
              </div> */}
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
    return this.getDashboardDisplay();
  };
};

MyAdminDashboard.contextType = StoreContext;

export default observer(MyAdminDashboard);
