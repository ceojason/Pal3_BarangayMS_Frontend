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

    if (isAck && !SettingsStore.isProcessing) return <BaseAckPagePanel {...this.props} />;

    return (
      <div className={buildClassNames('viewportlet_ctr', customClassName, isView ? 'isview' : '')}>
        <div className='viewportlet_hdr'>
          {(isConfirm && hasHeader) && (
            <Fragment>
              <span className='header_txt'>{header!=null ? header : ''}</span>
              <span className='subheader_txt'><i class="bi bi-exclamation-circle-fill"></i>{subHeader!=null ? subHeader : ''}</span>
            </Fragment>
          )}

          {!SettingsStore.isProcessing ? (
            (isAck && hasHeader) && (
              <Fragment>
                <div class="alert-success-box">
                  <div class="alert-icon"><i class="bi bi-check-circle-fill"></i></div>
                  <div class="alert-content">
                    <div class="alert-title">{ackMessage!=null ? ackMessage : ''}</div>
                    <div class="alert-details">Reference Number <span>{refNo}</span></div>
                  </div>
                </div>
                {<div className='form_divider'></div>}
              </Fragment>
            )
          ) : (
            isAck ? (
              <Fragment>
              <div class="alert-success-box-processing">
                <div class="alert-content">
                  <div class="alert-title">{'Your transaction is now processing...'}</div>
                </div>
              </div>
              {<div className='form_divider'></div>}
            </Fragment>
            ) : null
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
      modalContent,
      isImage,
      isObjectList,
      title
    } = this.props;

    const { showModal } = this.state;

    return (
      <>
        <div 
          className={buildClassNames('viewField_ctr', customClassName)} 
          style={{ cursor: modalContent ? 'pointer' : 'default' }}
          onClick={modalContent ? this.openModal : undefined}
        >
          <div className='viewField_hdr'>
            <span>{label || ''}</span>
          </div>

          <div className={buildClassNames('viewField_val', value ? '' : 'hasNoValue')}>
            <span className={isMessage ? 'white_line' : ''}>
              {icon || null}
              {value != null ? value : valueIfNull || ''}
              {modalContent!=null && isImage && <i class="bi bi-camera-fill"></i>}
            </span>
          </div>
        </div>

        {showModal && modalContent && (
          <div className="modal_overlay" onClick={this.closeModal}>
            <div className="modal_content" onClick={e => e.stopPropagation()}>
              {title && <h2>{title}</h2>}
              {isImage ? (
                <img src={modalContent} alt="Profile" className="modal_img" />
              ) : (
                isObjectList ? (
                  modalContent.map((u, index) => {
                    return (
                      <span className='modal_list_content' key={index}>
                        <p><i class="bi bi-caret-right-fill"></i>{u}</p>
                      </span>
                    );
                  })
                  ) : modalContent
              )}
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
