import React, { Component, Fragment } from 'react';
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
    icon: 'bi-megaphone-fill',
    url: '/announcementAdd',
    className: 'green'
  },
  {
    label: 'View Document Requests',
    icon: 'bi-file-earmark-text-fill',
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
    icon: 'bi-envelope-paper-fill',
    url: '/documentHistory',
    className: 'orange'
  },
  {
    label: 'View Announcement History',
    icon: 'bi-clock-history',
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
      <Fragment>
        <div className='quick_actions_ctr'>
          <div className="quick_actions">
            {actionList.map(action => (
              <button
                key={action.url}
                className={`qa_btn ${action.className}`}
                onClick={() => this.goTo(action.url)}
              >
                <i className={`bi ${action.icon}`} /> {action.label}
              </button>
            ))}

          </div>
        </div>
      </Fragment>
    );
  }
};

QuickActions.contextType = StoreContext;

export default withRouter(observer(QuickActions));