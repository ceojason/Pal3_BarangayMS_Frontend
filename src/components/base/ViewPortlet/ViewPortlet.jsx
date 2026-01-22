import React, { Component, Fragment } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import { buildClassNames } from '../../../utils/ClassUtils';
import BaseAckPagePanel from '../BaseAckPagePanel/BaseAckPagePanel';

class ViewPortlet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { 
      customClassName,
      isAck,
      isConfirm,
      isView,
      header,
      subHeader,
      hasDivider,
      refNo,
      ackMessage,
      hasHeader,
      data
    } = this.props;
    const { SettingsStore } = this.context.store;

    if (isAck) return <BaseAckPagePanel {...this.props} />;

    return (
      <div className={buildClassNames('viewportlet_ctr', customClassName, isView ? 'isview' : '')}>
        <div className='viewportlet_hdr'>
          {(isConfirm && hasHeader) && (
            <Fragment>
              <span className='header_txt'>{header!=null ? header : ''}</span>
              <span className='subheader_txt'><i class="bi bi-exclamation-circle-fill"></i>{subHeader!=null ? subHeader : ''}</span>
            </Fragment>
          )}

          {(isAck && hasHeader) && (
            <Fragment>
              {/* <div className='ackmessage_ctr'>
                <span className='msg'>
                  <i class="bi bi-check-circle-fill"></i>{ackMessage!=null ? ackMessage : ''}
                </span>
                <span className='refno'>
                  Your Reference Number is {refNo!=null ? refNo : ''}.
                </span>
              </div> */}
              <div class="alert-success-box">
                <div class="alert-icon"><i class="bi bi-check-circle-fill"></i></div>
                <div class="alert-content">
                  <div class="alert-title">{ackMessage!=null ? ackMessage : ''}</div>
                  <div class="alert-details">Reference Number <span>{refNo}</span></div>
                </div>
              </div>
              {<div className='form_divider'></div>}
            </Fragment>
          )}
        </div>

        {hasDivider && <div className='form_divider'></div>}

        <div className='viewportlet_body'>
          {this.props.children}
        </div>
      </div>
    );
  };

  notify = () => toast('Here is your toast.');

};

class ViewFieldComponent extends Component {

  render() {
    const { 
      customClassName,
      label,
      value,
      valueIfNull,
      icon,
      isMessage
    } = this.props;

    return (
      <div className={buildClassNames('viewField_ctr', customClassName)}>
        <div className='viewField_hdr'>
          <span>{label!=null ? label : ''}</span>
        </div>

        <div className={buildClassNames('viewField_val', 
          value!=null 
           ? ''
           : 'hasNoValue'
        )}>
          <span className={isMessage ? 'white_line' : ''}>
            {icon!=null
              ? icon
              : <></>
            }
            {value!=null 
             ? value
             : valueIfNull!=null
             ? valueIfNull
             : ''
            }
          </span>
        </div>
      </div>
    );
  };
};
const ViewField = observer(ViewFieldComponent);

ViewPortlet.defaultProps = {
  hasHeader: false
};

ViewPortlet.contextType = StoreContext;

export default observer(ViewPortlet);
export { ViewField };
