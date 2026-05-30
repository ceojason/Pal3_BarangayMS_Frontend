import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { buildClassNames } from '../../../utils/ClassUtils';

class BaseAccordion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openIndex: null,
      animated: true
    };
  }

  toggleCard = (index) => {
    this.setState({
      openIndex: this.state.openIndex === index ? null : index
    });
  };

  renderEmpty = () => {
    const { header, noContentMsg } = this.props;

    return (
      <div className="announcement_group animate_group">

        {/* DATE HEADER */}
        <div className="announcement_date empty_state_header">
          <i className="bi bi-calendar3"></i>
          {header}
          <span className="count">0</span>
        </div>

        {/* EMPTY STATE */}
        <div className="announcement_empty_card">

          <div className="empty_icon_wrapper">
            <i className="bi bi-inbox"></i>
          </div>

          <div className="empty_text">
            <h4>No Announcements Yet</h4>
            <p>
              {noContentMsg ||
                "There are no announcements for this date. Check back later for updates."}
            </p>
          </div>

        </div>

      </div>
    );
  };

  render() {
    const { header, data } = this.props;
    const { openIndex } = this.state;

    const safeData = Array.isArray(data) ? data : [];

    if (safeData.length === 0) {
      return this.renderEmpty();
    }

    return (
      <div className="announcement_group animate_group">

        {/* DATE HEADER */}
        <div className="announcement_date">
          <i className="bi bi-calendar3"></i>
          {header}
          <span className="count">{safeData.length}</span>
        </div>

        {/* ITEMS */}
        <div className="announcement_list">

          {safeData.map((item, index) => {

            const isOpen = openIndex === index;

            return (
              <div
                className={buildClassNames(
                  'announcement_card',
                  isOpen ? 'expanded' : ''
                )}
                key={index}
              >

                {/* HEADER (CLICKABLE) */}
                <div
                  className="announcement_card_header clickable"
                  onClick={() => this.toggleCard(index)}
                >

                  <div className="title">
                    <i class="bi bi-send-plus"></i>
                    {item.header}
                  </div>

                  <div className={buildClassNames(
                    'badge_type',
                    item.alertStatus === 0 ? 'info' : '',
                    item.alertStatus === 1 ? 'warning' : '',
                    item.alertStatus >= 2 ? 'danger' : ''
                  )}>
                    {item.messageTypeString}
                  </div>

                </div>

                {/* BODY (COLLAPSIBLE) */}
                <div className={buildClassNames(
                  'announcement_content',
                  isOpen ? 'open' : ''
                )}>

                  {/* MESSAGE */}
                  <div className="announcement_body">
                    {item.message}
                  </div>

                  {/* META */}
                  <div className="announcement_meta">

                    <div className="meta_row">
                      <span className="meta_label">Ref No:</span>
                      <span className="meta_value">{item.refNo || '-'}</span>
                    </div>

                    <div className="meta_row">
                      <span className="meta_label">Sent:</span>
                      <span className="meta_value">
                        {item.createdDtString}
                      </span>
                    </div>

                    <div className="meta_row">
                      <span className="meta_label">Location:</span>
                      <span className="meta_value">{item.location || 'Barangay Paliparan III'}</span>
                    </div>

                    <div className="meta_row">
                      <span className="meta_label">Channel:</span>
                      <span className="meta_value">{item.isSmsEmailString || 'System'}</span>
                    </div>

                  </div>

                  {/* FOOTER */}
                  <div className="announcement_footer">

                    <div>
                      <span className="small_label">Posted by:</span>
                      <span>{item.fullNm || 'System'}</span>
                    </div>

                    {/* <div>
                      <span className="small_label">Recipients:</span>
                      <span>{item.recipientListString || 'All residents'}</span>
                    </div> */}

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    );
  }
}

export default observer(BaseAccordion);