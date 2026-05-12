import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';

class DashboardAnncCard extends Component {
  constructor(props) {
    super(props);
  }

  formatDate = (date) => {
    if (!date) return '';

    return new Date(date).toLocaleString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  getMessageTypeClass = (messageType) => {
    if (!messageType) return 'normal';

    const type = messageType.toLowerCase();

    if (type.includes('Emergency') || type.includes('emergency')) {
      return 'urgent';
    }

    if (type.includes('Critical') || type.includes('critical')) {
      return 'important';
    }

    if (type.includes('Warning')) {
      return 'warning';
    }

    return 'normal';
  };

  render() {
    const { header, data } = this.props;

    return (
      <div className='dashboardannc_ctr'>
        <div className='dashboardannc_hdr'>
          <div className='dashboardannc_hdr_left'>
            <div className='dashboardannc_icon'>
              <i className='bi bi-megaphone-fill'></i>
            </div>

            <div>
              <span className='dashboardannc_title'>{header}</span>
              <p className='dashboardannc_subtitle'>
                Listed here are alerts and notifications you received for the day.
              </p>
            </div>
          </div>

          <div className='dashboardannc_badge'>
            {data ? data.length : 0}
          </div>
        </div>

        <div className='dashboardannc_content'>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div className='dashboardannc_item' key={index}>
                <div className='dashboardannc_item_top'>
                  <div className='dashboardannc_item_icon'>
                    <i className='bi bi-bell-fill'></i>
                  </div>

                  <div className='dashboardannc_item_info'>
                    <div className='dashboardannc_item_header'>
                      <span className='dashboardannc_item_title'>
                        {item.header || 'Announcement'}
                      </span>

                      <span
                        className={`dashboardannc_type ${this.getMessageTypeClass(item.alertStatusString)}`}
                      >
                        {item.messageTypeString || 'Normal'}
                      </span>
                    </div>

                    <div className='dashboardannc_meta'>
                      <span className='dashboardannc_refno'>
                        <i className='bi bi-hash'></i>
                        {item.refNo || 'N/A'}
                      </span>

                      <span className='dashboardannc_item_date'>
                        <i className='bi bi-clock'></i>

                        {item.createdDtString ||
                          this.formatDate(
                            item.createdDate ||
                            item.dateCreated ||
                            item.createdAt
                          )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='dashboardannc_message white_line'>
                  {item.message ||
                    item.description ||
                    item.content ||
                    'No announcement details available.'}
                </div>
              </div>
            ))
          ) : (
            <div className='dashboardannc_empty'>
              <i className='bi bi-megaphone'></i>
              <span>No announcement logs found.</span>
            </div>
          )}
        </div>
      </div>
    );
  }
};

DashboardAnncCard.contextType = StoreContext;

export default observer(DashboardAnncCard);