import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import { withRouter } from '../../utils/RouterUtils';

const ADMIN_ACTIONS = [
  {
    label: 'Add New Resident',
    icon: 'bi-person-plus-fill',
    url: '/usersAdd',
    className: 'orange'
  },
  {
    label: 'Create New Announcement',
    icon: 'bi-send-arrow-up-fill',
    url: '/announcementAdd',
    className: 'green'
  },
  {
    label: 'View Document Requests',
    icon: 'bi-file-earmark-pdf-fill',
    url: '/viewDocumentRequests',
    className: 'blue'
  },
  {
    label: 'View Logs',
    icon: 'bi-bar-chart-fill',
    url: '/notificationLogs',
    className: 'dark'
  }
];

const RESIDENT_ACTIONS = [
  {
    label: 'Request a Document',
    icon: 'bi-envelope-paper-fill',
    url: '/documentRequest',
    className: 'orange'
  },
  {
    label: 'Document Requests History',
    icon: 'bi-clock-history',
    url: '/documentHistory',
    className: 'orange'
  },
  {
    label: 'View Announcement History',
    icon: 'bi-megaphone-fill',
    url: '/announcementLogs',
    className: 'blue'
  }
];

class QuickActions extends Component {

  goTo = (url) => {
    this.props.navigate(url);
  };

  render() {
    const { isAdmin } = this.props;
    const actionList = isAdmin ? ADMIN_ACTIONS : RESIDENT_ACTIONS;

    return (
      <div className="quick_actions_ctr">
        <div className="quick_actions">

          <span className="qa_label">
            <i className="bi bi-lightning-charge-fill"></i>
            Quick Actions
          </span>

          {actionList.map(action => (
            <button
              key={action.url}
              className={`qa_btn ${action.className}`}
              onClick={() => this.goTo(action.url)}
            >
              <i className={`bi ${action.icon}`} />
              <span>{action.label}</span>
            </button>
          ))}

        </div>
      </div>
    );
  }
}

QuickActions.contextType = StoreContext;

export default withRouter(observer(QuickActions));