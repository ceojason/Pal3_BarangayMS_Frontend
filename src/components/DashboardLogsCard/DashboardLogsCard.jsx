import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';

class DashboardLogsCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { header, data } = this.props;

    return (
      <div className='dashboardlogs_ctr'>
        <div className='dashboardlogs_hdr'>
          <span>{header}</span>
        </div>

        <div className='dashboardlogs_content'>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} className='dashboardlogs_item'>
                
                <div className='item_hdr'>
                  <span className='name'>
                    <i className="bi bi-person-fill"></i>
                    {' '}
                    {item.recipient}
                  </span>

                  <span className='type'>
                    {item.mainActionStr}
                  </span>
                </div>

                <div className='item_body'>
                  <span className='desc'>{item.otherDetail}</span>
                  <span className='date'>
                    <i className="bi bi-clock"></i>
                    {' '}
                    {item.sendDtString}
                  </span>
                </div>

                <div className='item_footer'>
                  <span className='refNo'>
                    Ref #: {item.refNo}
                  </span>
                </div>

              </div>
            ))
          ) : (
            <div className='dashboardlogs_empty'>
              No recent logs found.
            </div>
          )}
        </div>
        
      </div>
    );
  };
};

DashboardLogsCard.contextType = StoreContext;

export default observer(DashboardLogsCard);
