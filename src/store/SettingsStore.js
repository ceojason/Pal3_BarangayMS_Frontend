import { action, makeObservable, observable } from 'mobx';

class SettingsStore {
  constructor() {
    makeObservable(this, {
      showErrorModal: observable,
      errorList: observable,
      showSuccessModal: observable,
      showConfirmModal: observable,
      successMsg: observable,
      customModal: observable,
      showSuccessPanel: observable,
      showError: action,
      showSuccessMsg: action,
      showModal: action,
      hideCustomModal: action,
      isInitialSearch: observable,
    });
  };

  // ✅ State for error modal
  showErrorModal = false;
  errorList = [];

  // ✅ State for success modal
  showSuccessModal = false;
  successMsg = {
    ackMessage: null,
    refNo: null
  };

  showConfirmModal = false;

  showSuccessPanel = false;

  // ✅ State for flexible delete/update/custom modals
  customModal = {
    isVisible: false,
    type: null, // 'delete' | 'update' | 'custom'
    headerTitle: '',
    valueToDisplay: '',
    additionalBtn: null,
    onClose: null,
    data: null
  };

  isInitialSearch = true;

  showError(error) {
    if (error != null && error.length > 0) {
      this.showErrorModal = true;
      this.errorList = error;
    }
  }

  showSuccessMsg(succMsg) {
    if (succMsg && succMsg.ackMessage) {
      this.showSuccessModal = true;
      this.successMsg = {
        ackMessage: succMsg.ackMessage,
        refNo: succMsg.refNo
      };
    }
  }

  showModal(config = {}) {
    const {
      type = 'info',
      message = null,
      refNo = null,
      errorList = [],
      valueToDisplay = '',
      additionalBtn = null,
      headerTitle = '',
      onClose = null,
      data = null
    } = config;
    // Reset all modal states first
    this.showErrorModal = false;
    this.errorList = [];
    this.showSuccessModal = false;
    this.showConfirmModal = false;
    this.successMsg = { ackMessage: null, refNo: null };
    this.customModal = {
      isVisible: false,
      type: null,
      headerTitle: '',
      valueToDisplay: '',
      additionalBtn: null,
      onClose: null,
      data: null
    };

    switch (type) {
      case 'error':
        this.showErrorModal = true;
        this.errorList = errorList || (message ? [message] : []);
        this.customModal = {
          isVisible: true,
          type: 'error',
          headerTitle: 'An error occurred.',
          errorList: this.errorList,
          valueToDisplay: '',
          additionalBtn: null,
          onClose: null,
          data: null
        };
        break;

      case 'success':
        this.showSuccessModal = true;
        this.successMsg = {
          ackMessage: message,
          refNo: refNo
        };
        this.customModal = {
          isVisible: true,
          type: 'success',
          headerTitle: 'Success',
          valueToDisplay: message,
          additionalBtn: null,
          onClose,
          data,
        };
        break;

      case 'delete':
        this.showConfirmModal = true,
        this.customModal = {
          type,
          headerTitle,
          valueToDisplay,
          additionalBtn,
          onClose,
          data
        };
        break;
      case 'update':
      case 'custom':
        this.customModal = {
          isVisible: true,
          type,
          headerTitle,
          valueToDisplay,
          additionalBtn,
          onClose,
          data
        };
        break;

      default:
        break;
    }
  }

  hideCustomModal() {
    this.showConfirmModal=false;
    this.showSuccessModal=false;
    this.showErrorModal=false;
  };

}

export default SettingsStore;