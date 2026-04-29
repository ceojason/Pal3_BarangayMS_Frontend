import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';

class SystemConfigPanel extends Component {
  constructor(props) {
    super(props);
  }

  configPanel = () => {
    return (
      <div className="system_config_form">
        <div className="header">
          <span>
            <i className="bi bi-gear-fill"></i>
            {' System Configuration'}
          </span>
        </div>

        <div>
          {/* GLOBAL */}
          <div>
            <h6>Global</h6>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="maintenanceSwitch"
              />
              <label
                className="form-check-label"
                htmlFor="maintenanceSwitch"
              >
                Maintenance Mode
              </label>
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div>
            <h6>Notifications</h6>
            <p>Applicable for users with valid and working email.</p>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="resetNotif"
              />
              <label className="form-check-label" htmlFor="resetNotif">
                Allow email notifications for user reset
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="docRequestNotif"
              />
              <label className="form-check-label" htmlFor="docRequestNotif">
                Allow email notifications for document requests
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="profileUpdateNotif"
              />
              <label className="form-check-label" htmlFor="profileUpdateNotif">
                Allow email notifications after updating user profiles
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="loginNotif"
              />
              <label className="form-check-label" htmlFor="loginNotif">
                Allow email notifications upon login
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.configPanel();
  }
};

SystemConfigPanel.contextType = StoreContext;

export default observer(SystemConfigPanel);
