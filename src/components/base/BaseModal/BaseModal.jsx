import React, { Component, createRef } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

class BaseModal extends Component {
  static contextType = StoreContext;

  constructor(props) {
    super(props);
    this.modalRef = createRef();
    this.bsModal = null;
  }

  componentDidMount() {
    if (this.modalRef.current) {
      this.bsModal = new bootstrap.Modal(this.modalRef.current, {
        keyboard: true,
        backdrop: 'static'
      });

      this.modalRef.current.addEventListener('hidden.bs.modal', () => {
        const { SettingsStore } = this.context.store;

        // ✅ Reset all modal state
        SettingsStore.showErrorModal = false;
        SettingsStore.errorList = [];

        SettingsStore.showSuccessModal = false;
        SettingsStore.successMsg = {
          ackMessage: null,
          refNo: null
        };

        SettingsStore.customModal = {
          isVisible: false,
          headerTitle: '',
          type: '',
          successMsg: {},
          errorList: [],
          valueToDisplay: null,
          additionalBtn: null,
          data: null,
          onClose: null
        };

        if (this.props.onClose) {
          this.props.onClose();
        }
      });

      if (this.shouldShowModal(this.props)) {
        setTimeout(() => {
          if (this.bsModal) this.bsModal.show();
        }, 0);
      }
    }
  }

  componentDidUpdate(prevProps) {
    const wasShowing = this.shouldShowModal(prevProps);
    const isShowing = this.shouldShowModal(this.props);

    if (!this.bsModal) return;

    if (!wasShowing && isShowing) {
      this.bsModal.show();
    } else if (wasShowing && !isShowing) {
      this.bsModal.hide();
    }
  }

  shouldShowModal(props = this.props) {
    const { isSuccess, isDelete, errorList } = props;
    return isSuccess || (errorList && errorList.length > 0) || isDelete;
  }

  handleClose = () => {
    if (this.bsModal) this.bsModal.hide();
  };

  render() {
    const {
      errorList = [],
      isSuccess = false,
      headerTitle = '',
      successMsg = {},
      additionalBtn,
      data,
      valueToDisplay,
      isDelete,
      isUpdate
    } = this.props;

    return (
      <div
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="errorModalLabel"
        aria-hidden="true"
        ref={this.modalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="errorModalLabel">
                {headerTitle}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={this.handleClose}
              ></button>
            </div>
            <div className="modal-body">
              {!isSuccess && errorList.length > 0 && (
                <ul>
                  {errorList.map((err, idx) => (
                    <li key={idx}>
                      <i className="bi bi-exclamation-circle-fill"></i> {err}
                    </li>
                  ))}
                </ul>
              )}
              {isSuccess && (
                <div className="successMsg_panel">
                  <span className="ackMsg">
                    <i className="bi bi-check-circle-fill"></i>
                    {successMsg?.ackMessage}
                  </span>
                  <span className="refNo">
                    Your Reference Number is {successMsg?.refNo}.
                  </span>
                </div>
              )}
              {isDelete && (
                <div className="confirmMsg_panel">
                  Do you want to delete the record of{' '}
                  <span className="confirmMsg_nm">{valueToDisplay || ''}</span>?
                </div>
              )}
              {isUpdate && (
                <div className="confirmMsg_panel">
                  You will be updating the record of{' '}
                  <span className="confirmMsg_nm">{valueToDisplay || ''}</span>. Proceed with the transaction?
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleClose}
              >
                Close
              </button>
              {additionalBtn && additionalBtn(data)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default observer(BaseModal);