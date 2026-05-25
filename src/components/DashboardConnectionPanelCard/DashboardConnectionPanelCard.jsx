import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';

class DashboardConnectionPanelCard extends Component {
  render() {
    const { header, data } = this.props;

    return (
      <div className='systemstatus_ctr'>
        <div className='systemstatus_hdr'>
          <span>{header || 'System Status'}</span>
        </div>

        <div className='systemstatus_content'>

          {/* SMS Gateway */}
          <div className='systemstatus_item'>
            <span className='label'>SMS/Email Services</span>
            <span className='badge success'>
              <i className="bi bi-check-circle-fill"></i>
              Online
            </span>
          </div>

          {/* Database */}
          <div className='systemstatus_item'>
            <span className='label'>Database</span>
            <span className='badge success'>
              <i className="bi bi-check-circle-fill"></i>
              Healthy
            </span>
          </div>

          {/* Portal */}
          <div className='systemstatus_item'>
            <span className='label'>System Status</span>
            <span className='badge success'>
              <i className="bi bi-check-circle-fill"></i>
              Running
            </span>
          </div>

        </div>
      </div>
    );
  }
}

DashboardConnectionPanelCard.contextType = StoreContext;

export default observer(DashboardConnectionPanelCard);