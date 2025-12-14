import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import DashboardCard from '../DashboardCard/DashboardCard';
import NoAccessCtr from '../base/NoAccessCtr/NoAccessCtr';

class MyAdminDashboard extends Component {
  constructor(props) {
    super(props);
  }

  getDashboardDisplay = () => {
    return (
      <Fragment>
        {this.dashboardHdr()}
        <div className='cards_ctr'>
          <div className='cards_ctr_hdr'>
            
          </div>
          <div className='grid_ctr'>
            <div className='col_one'>
              <DashboardCard />
            </div>
            <div>
              <div className='col_two'>
                <DashboardCard />
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
            <div className='dashboard_display_user'>
              Hi, <span className='user_nm'>{currentUser!=null ? currentUser.firstName : ''}</span>!
            </div>
            <div className='user_badge'>
              <span>{currentUser!=null ? currentUser.roleDscp : ''}</span>
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
