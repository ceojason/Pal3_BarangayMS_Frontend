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
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  openModal = () => {
    if (this.props.onClick) {
      this.props.onClick(); // call parent callback if provided
    } else {
      this.setState({ showModal: true });
    }
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { 
      customClassName,
      label,
      value,
      valueIfNull,
      icon,
      isMessage,
      modalDisplay
    } = this.props;

    const { showModal } = this.state;

    return (
      <>
        <div 
          className={buildClassNames('viewField_ctr', customClassName)} 
          style={{ cursor: modalDisplay ? 'pointer' : 'default' }}
          onClick={modalDisplay ? this.openModal : undefined}
        >
          <div className='viewField_hdr'>
            <span>{label || ''}</span>
          </div>

          <div className={buildClassNames('viewField_val', value ? '' : 'hasNoValue')}>
            <span className={isMessage ? 'white_line' : ''}>
              {icon || null}
              {value != null ? value : valueIfNull || ''}
              {modalDisplay!=null && <i class="bi bi-camera-fill"></i>}
            </span>
          </div>
        </div>

        {showModal && modalDisplay && (
          <div className="modal_overlay" onClick={this.closeModal}>
            <div className="modal_content" onClick={e => e.stopPropagation()}>
              <img src={modalDisplay} alt="Profile" className="modal_img" />
              <button className="modal_close_btn" onClick={this.closeModal}>×</button>
            </div>
          </div>
        )}
      </>
    );
  }
};

const ViewField = observer(ViewFieldComponent);

ViewPortlet.defaultProps = {
  hasHeader: false
};

ViewPortlet.contextType = StoreContext;

export default observer(ViewPortlet);
export { ViewField };
