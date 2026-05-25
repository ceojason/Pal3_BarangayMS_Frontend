import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import { withRouter } from '../../utils/RouterUtils';

const ADMIN_ACTIONS = [
  {
    label: 'Add New Resident',
    icon: 'bi-people',
    url: '/usersAdd',
    className: 'orange'
  },
  {
    label: 'Manage Household',
    icon: 'bi-house-gear',
    url: '/household',
    className: 'green'
  },
  {
    label: 'Create and Send New Announcement',
    icon: 'bi-send-plus',
    url: '/announcementAdd',
    className: 'green'
  },
  {
    label: 'View Document Requests',
    icon: 'bi-file-earmark-pdf',
    url: '/viewDocumentRequests',
    className: 'blue'
  },
  {
    label: 'View Community Reports',
    icon: 'bi-folder2-open',
    url: '/searchCommunityReports',
    className: 'blue'
  },
  {
    label: 'View Notification Logs',
    icon: 'bi-journal-check',
    url: '/notificationLogs',
    className: 'orange'
  }
];

const RESIDENT_ACTIONS = [
  {
    label: 'Request a Document',
    icon: 'bi-file-earmark-pdf',
    url: '/documentRequest',
    className: 'orange'
  },
  {
    label: 'Document Requests History',
    icon: 'bi-hourglass-split',
    url: '/documentHistory',
    className: 'orange'
  },
  {
    label: 'File a Community Report',
    icon: 'bi-folder2-open',
    url: '/communityReport',
    className: 'blue'
  },
  {
    label: 'View Announcement History',
    icon: 'bi-send-plus',
    url: '/announcementLogs',
    className: 'blue'
  },
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