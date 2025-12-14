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
      keyboard: true,
      //backdrop: 'static'
    });

    this.modalRef.current.addEventListener('hidden.bs.modal', () => {
      const { SettingsStore } = this.context.store;

      // ✅ Reset notification states
      SettingsStore.showErrorModal = false;
      SettingsStore.errorList = [];

      SettingsStore.showSuccessModal = false;
      SettingsStore.successMsg = {
        ackMessage: null,
        refNo: null
      };

      if (this.props.onClose) {
        this.props.onClose();
      }
    });

    if (this.shouldShowModal(this.props)) {
      setTimeout(() => this.bsModal?.show(), 0);
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.bsModal) return;

    const wasShowing = this.shouldShowModal(prevProps);
    const isShowing = this.shouldShowModal(this.props);

    if (!wasShowing && isShowing) {
      this.bsModal.show();
    } else if (wasShowing && !isShowing) {
      this.bsModal.hide();
    }
  }

  shouldShowModal(props = this.props) {
    const { isSuccess, errorList } = props;
    return isSuccess || (errorList && errorList.length > 0);
  }

  handleClose = () => {
    this.bsModal?.hide();
  };

  render() {
    const {
      headerTitle = '',
      isSuccess = false,
      successMsg = {},
      errorList = []
    } = this.props;

    return (
      <div
        className="modal fade"
        tabIndex="-1"
        aria-hidden="true"
        ref={this.modalRef}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            {/* HEADER */}
            <div className="modal-header">
              <h5 className="modal-title">{headerTitle}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={this.handleClose}
              />
            </div>

            {/* BODY */}
            <div className="modal-body">
              {!isSuccess && errorList.length > 0 && (
                <ul className="errorMsg_panel">
                  {errorList.map((err, idx) => (
                    <li key={idx}>
                      <i className="bi bi-exclamation-circle-fill" /> {err}
                    </li>
                  ))}
                </ul>
              )}

              {isSuccess && (
                <div className="successMsg_panel">
                  <span className="ackMsg">
                    <i className="bi bi-check-circle-fill" />
                    {successMsg?.ackMessage}
                  </span>
                  {successMsg?.refNo && (
                    <span className="refNo">
                      Your Reference Number is {successMsg.refNo}.
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleClose}
              >
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