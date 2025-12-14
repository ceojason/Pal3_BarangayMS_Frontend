import React, { Component, createRef } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

class BaseConfirmModal extends Component {
  static contextType = StoreContext;

  constructor(props) {
    super(props);
    this.modalRef = createRef();
    this.bsModal = null;
  }

  componentDidMount() {
    this.bsModal = new bootstrap.Modal(this.modalRef.current, {
      keyboard: true,
      backdrop: 'static'
    });

    // Show modal immediately when mounted
    setTimeout(() => {
      this.bsModal.show();
    }, 0);

    // Cleanup when modal is fully hidden
    this.modalRef.current.addEventListener('hidden.bs.modal', () => {
      const { SettingsStore } = this.context.store;

      SettingsStore.showConfirmModal = false;
      SettingsStore.customModal = {
        type: null,
        headerTitle: '',
        valueToDisplay: null,
        additionalBtn: null,
        data: null,
        onClose: null
      };

      this.props.onClose?.();
    });
  }

  handleClose = () => {
    this.bsModal?.hide();
  };

  render() {
    const {
      headerTitle,
      valueToDisplay,
      additionalBtn,
      data,
      type
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
            <div className="modal-header">
              <h5 className="modal-title">{headerTitle}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={this.handleClose}
              />
            </div>

            <div className="modal-body">
              {type === 'delete' && (
                <div className="confirmMsg_panel">
                  Do you want to delete the record of{' '}
                  <span className="confirmMsg_nm">
                    {valueToDisplay}
                  ?
                  </span>
                </div>
              )}

              {type === 'update' && (
                <div className="confirmMsg_panel">
                  You will be updating the record of{' '}
                  <span className="confirmMsg_nm">
                    {valueToDisplay}
                  </span>
                  . Proceed with the transaction?
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
              {additionalBtn && additionalBtn(data, () => {
                this.handleClose();
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default observer(BaseConfirmModal);