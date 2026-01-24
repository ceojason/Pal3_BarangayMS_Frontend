import { action, makeObservable, observable } from 'mobx';

class SettingsStore {
  constructor() {
    makeObservable(this, {
      showErrorModal: observable,
      showSuccessModal: observable,
      showConfirmModal: observable,
      errorList: observable,
      successMsg: observable,
      customModal: observable,
      isInitialSearch: observable,

      showModal: action,
      hideCustomModal: action,
      isLoading: observable,
    });
  }

  showErrorModal = false;
  showSuccessModal = false;
  showConfirmModal = false;

  isLoading = false;

  errorList = [];

  successMsg = {
    ackMessage: null,
    refNo: null
  };

  customModal = {
    type: null,
    headerTitle: '',
    valueToDisplay: '',
    additionalBtn: null,
    onClose: null,
    data: null,
    errorList: []
  };

  isInitialSearch = true;

  // ===============================
  // SHOW MODAL
  // ===============================
  showModal(config = {}) {
    const {
      type,
      message = '',
      refNo = null,
      errorList = [],
      headerTitle = '',
      valueToDisplay = '',
      additionalBtn = null,
      data = null,
    } = config;

    // 🔁 Reset everything first
    this.hideCustomModal();

    const onClose = () => this.hideCustomModal();

    switch (type) {
      case 'error':
        this.showErrorModal = true;
        this.errorList = errorList.length ? errorList : [message];

        this.customModal = {
          type: 'error',
          headerTitle: headerTitle || 'Transaction could not be processed.',
          errorList: this.errorList,
          onClose
        };
        break;

      case 'success':
        this.showSuccessModal = true;
        this.successMsg = { ackMessage: message, refNo };

        this.customModal = {
          type: 'success',
          headerTitle: headerTitle || 'Success',
          valueToDisplay: message,
          onClose
        };
        break;

      case 'delete':
        this.showConfirmModal = true;

        this.customModal = {
          type: 'delete',
          headerTitle,
          valueToDisplay,
          additionalBtn,
          data,
          onClose
        };
        break;

      case 'update':
        this.showConfirmModal = true;

        this.customModal = {
          type: 'update',
          headerTitle,
          valueToDisplay,
          additionalBtn,
          data,
          onClose
        };
        break;
        
      case 'custom':
        this.showConfirmModal = true;

        this.customModal = {
          type,
          headerTitle,
          valueToDisplay,
          additionalBtn,
          data,
          onClose
        };
        break;

      default:
        break;
    }
  }

  // ===============================
  // HIDE MODAL
  // ===============================
  hideCustomModal() {
    this.showErrorModal = false;
    this.showSuccessModal = false;
    this.showConfirmModal = false;

    this.errorList = [];
    this.successMsg = { ackMessage: null, refNo: null };

    this.customModal = {
      type: null,
      headerTitle: '',
      valueToDisplay: '',
      additionalBtn: null,
      onClose: null,
      data: null,
      errorList: []
    };
  }
}

export default SettingsStore;