import React, { Component, createRef } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

class BaseNotificationModal extends Component {
  static contextType = StoreContext;

  constructor(props) {
    super(props);
    this.modalRef = createRef();
    this.bsModal = null;
  }

  componentDidMount() {
    if (!this.modalRef.current) return;

    this.bsModal = new bootstrap.Modal(this.modalRef.current, {
      keyboard: true
    });

    // ✅ ALWAYS SHOW ON MOUNT
    setTimeout(() => this.bsModal.show(), 0);

    this.modalRef.current.addEventListener('hidden.bs.modal', () => {
      const { SettingsStore } = this.context.store;

      // ✅ Reset notification state
      SettingsStore.showSuccessModal = false;
      SettingsStore.showErrorModal = false;
      SettingsStore.successMsg = { ackMessage: null, refNo: null };
      SettingsStore.errorList = [];
      SettingsStore.customModal = {};

      this.props.onClose?.();
    });
  }

  handleClose = () => {
    this.bsModal?.hide();
  };

  render() {
    const {
      headerTitle = '',
      type,
      successMsg = {},
      errorList = []
    } = this.props;

    return (
      <div className="modal fade" tabIndex="-1" ref={this.modalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">{headerTitle}</h5>
              <button className="btn-close" onClick={this.handleClose} />
            </div>

            <div className="modal-body">
              {type === 'error' && (
                <ul className="errorMsg_panel">
                  {errorList.map((err, i) => (
                    <li key={i}><i className="bi bi-exclamation-circle-fill"></i>{err}</li>
                  ))}
                </ul>
              )}

              {type === 'success' && (
                <div className="successMsg_panel">
                  <div>{successMsg.ackMessage}</div>
                  {successMsg.refNo && (
                    <div>Reference Number {successMsg.refNo}</div>
                  )}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={this.handleClose}>
                Close
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default observer(BaseNotificationModal);