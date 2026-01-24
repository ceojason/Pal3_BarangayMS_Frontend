import React, { Component, Fragment } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import { buildClassNames } from '../../../utils/ClassUtils';

class BaseAccordion extends Component {
  constructor(props) {
    super(props);
  }

  getAccordion = () => {
    const { header, data, noContentMsg } = this.props;
    
    if (!data || data.length === 0) {
      return (
        <div className="accordion_ctr accordion_no_content">
          <div className="accordion_hdr">
            <span className='header'>
              <i className="bi bi-megaphone-fill"></i>{header}
            </span>
          </div>
          <div className='no_item'>
            <p><i class="bi bi-database-fill-x"></i>{noContentMsg!=null ? noContentMsg : 'No content available.'}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="accordion_ctr">
        <div className="accordion_hdr">
          <span className='header'>
            <i className="bi bi-megaphone-fill"></i>{header}
          </span>
          <span className='data_count'>
            {data.length > 0 ? data.length : ''}
          </span>
        </div>

        <div className="accordion" id="accordionExample">
          {data.map((announcement, index) => {
            const collapseId = `collapse${index}`;
            const isFirst = index === 0;
            // const isFirst = false;

            return (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${!isFirst ? "collapsed" : ""}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded={isFirst}
                    aria-controls={collapseId}>
                    <i class="bi bi-caret-right-fill"></i>{announcement.header}
                    <div className={buildClassNames('message_type',
                      announcement.alertStatus===0 ? 'informational' : '',
                      announcement.alertStatus===1 ? 'warning' : '',
                      announcement.alertStatus===2 || announcement.alertStatus===3 ? 'extreme' : '',
                    )}>
                      {announcement.messageTypeString}
                    </div>
                  </button>
                </h2>

                <div
                  id={collapseId}
                  className={`accordion-collapse collapse ${isFirst ? "show" : ""}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body white_line">
                    {announcement.message || "No content available."}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    const { data } = this.props;
    return this.getAccordion(data);
  }
};

BaseAccordion.contextType = StoreContext;

export default observer(BaseAccordion);
