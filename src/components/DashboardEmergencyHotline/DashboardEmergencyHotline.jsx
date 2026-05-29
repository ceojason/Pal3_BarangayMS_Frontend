import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';

class DashboardEmergencyHotline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAll: false
    };
  }

  toggleShow = () => {
    this.setState((prev) => ({
      showAll: !prev.showAll
    }));
  };

  getTypeClass = (key) => {
    if (!key) return 'default';

    const hotlineKey = key.toLowerCase();

    if (
      hotlineKey.includes('police') ||
      hotlineKey.includes('pnp')
    ) return 'police';

    if (
      hotlineKey.includes('fire') ||
      hotlineKey.includes('bfp')
    ) return 'fire';

    if (
      hotlineKey.includes('medical') ||
      hotlineKey.includes('ambulance') ||
      hotlineKey.includes('hospital')
    ) return 'medical';

    if (
      hotlineKey.includes('rescue') ||
      hotlineKey.includes('cdr') ||
      hotlineKey.includes('disaster')
    ) return 'rescue';

    if (
      hotlineKey.includes('electric') ||
      hotlineKey.includes('water') ||
      hotlineKey.includes('utility')
    ) return 'utility';

    return 'default';
  };

  getIcon = (key) => {
    if (!key) return 'bi bi-telephone-fill';

    const hotlineKey = key.toLowerCase();

    if (hotlineKey.includes('police') || hotlineKey.includes('pnp'))
      return 'bi bi-shield-fill';

    if (hotlineKey.includes('fire') || hotlineKey.includes('bfp'))
      return 'bi bi-fire';

    if (
      hotlineKey.includes('medical') ||
      hotlineKey.includes('ambulance') ||
      hotlineKey.includes('hospital')
    )
      return 'bi bi-heart-pulse-fill';

    if (
      hotlineKey.includes('rescue') ||
      hotlineKey.includes('cdr') ||
      hotlineKey.includes('disaster')
    )
      return 'bi bi-life-preserver';

    if (hotlineKey.includes('electric'))
      return 'bi bi-lightning-charge-fill';

    if (hotlineKey.includes('water'))
      return 'bi bi-droplet-fill';

    if (hotlineKey.includes('barangay'))
      return 'bi bi-building';

    return 'bi bi-telephone-fill';
  };

  render() {
    const { header, data } = this.props;
    const { showAll } = this.state;

    const visibleData =
      data && data.length > 0
        ? showAll
          ? data
          : data.slice(0, 3)
        : [];

    return (
      <div className='dashboardhotline_ctr'>
        <div className='dashboardhotline_hdr'>
          <div className='dashboardhotline_hdr_left'>
            <div className='dashboardhotline_icon'>
              <i className='bi bi-telephone-fill'></i>
            </div>

            <div>
              <span className='dashboardhotline_title'>
                {header}
              </span>

              <p className='dashboardhotline_subtitle'>
                Important emergency and rescue hotline numbers.
              </p>
            </div>
          </div>

          <div className='dashboardhotline_badge'>
            {data ? data.length : 0}
          </div>
        </div>

        <div className='dashboardhotline_content'>
          {visibleData.length > 0 ? (
            visibleData.map((item, index) => {
              const typeClass = this.getTypeClass(item.key);
              const hotlineNo = item.value || 'N/A';

              return (
                <div
                  className='dashboardhotline_item'
                  key={index}
                >
                  <div className='dashboardhotline_item_left'>
                    <div
                      className={`dashboardhotline_item_icon ${typeClass}`}
                    >
                      <i className={this.getIcon(item.key)}></i>
                    </div>

                    <div className='dashboardhotline_item_info'>
                      <div className='dashboardhotline_item_header'>
                        <span className='dashboardhotline_item_title'>
                          {item.key || 'Emergency Hotline'}
                        </span>

                        <span
                          className={`dashboardhotline_type ${typeClass}`}
                        >
                          {typeClass}
                        </span>
                      </div>

                      <div className='dashboardhotline_number'>
                        <i className='bi bi-telephone'></i>
                        {hotlineNo}
                      </div>
                    </div>
                  </div>

                  <div className='dashboardhotline_actions'>
                    <a
                      href={`tel:${hotlineNo}`}
                      className='dashboardhotline_callbtn'
                    >
                      <i className='bi bi-telephone-fill'></i>
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <div className='dashboardhotline_empty'>
              <i className='bi bi-telephone-x'></i>
              <span>No emergency hotline found.</span>
            </div>
          )}

          {/* SHOW MORE / LESS BUTTON */}
          {data && data.length > 3 && (
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <button
                onClick={this.toggleShow}
                className='dashboardhotline_togglebtn'
              >
                {showAll ? 'Show Less' : 'Show More'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

DashboardEmergencyHotline.contextType = StoreContext;

export default observer(DashboardEmergencyHotline);