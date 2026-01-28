import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseAccordion from '../base/BaseAccordion/BaseAccordion';

class AnnouncementLogsPanel extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    const { AnnouncementStore, SessionStore } = this.context.store;
    SessionStore.isLoading = true;

    if (SessionStore.currentUser != null && SessionStore.currentUser.roleKey != null) {
      AnnouncementStore.getAnnouncementListGrouped(SessionStore.currentUser.roleKey)
        .then(data => {
          AnnouncementStore.data = data || [];
          SessionStore.isLoading = false;
        });
    }
  }

  groupByDate = (list) => {
    if (!list) return {};

    if (!Array.isArray(list)) {
      return list;
    }

    return list.reduce((acc, item) => {
      const date = new Date(item.createdDt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });

      if (!acc[date]) acc[date] = [];
      acc[date].push(item);

      return acc;
    }, {});
  };

  announcementHistory = () => {
    const { AnnouncementStore } = this.context.store;
    const grouped = this.groupByDate(AnnouncementStore.data);

    return (
      <Fragment>
        <div className='announcement_logs_ctr'>
          <div className='announcement_logs_header'>
            <span className='main_header'><i className="bi bi-clock-history"></i>Announcement History</span>
            <span className='sub_header'>View announcement history and logs here.</span>
          </div>

          <div className='announcement_body'>
            {Object.entries(grouped).map(([date, list]) => (
              <BaseAccordion
                key={date}
                data={list}
                header={date}
                noContentMsg="No announcement found."
                showFirst={false}
              />
            ))}
          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    return this.announcementHistory();
  }
}

AnnouncementLogsPanel.contextType = StoreContext;

export default observer(AnnouncementLogsPanel);