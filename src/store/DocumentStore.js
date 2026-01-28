import { makeAutoObservable } from 'mobx';
import api from '../api/api';
import StepperContants from '../../contants/StepperContants';

class DocumentStore {
  constructor() {

    this.reset();
    this.resetInquiry();
    makeAutoObservable(this);
  };


  /* =====================
  OBSERVABLE STATES
  ===================== */
  errorList = [];
  inquiryData = [];
  viewData = null;

  currentStep = StepperContants.MANUAL_ENROLL_CREATE;
  searchStep = StepperContants.INQUIRY_INITIAL;

  enrollmentRequest = {};

  ackHeader = {
    ackMessage: null,
    refNo: null
  };
  

  /* =====================
   RESET METHODS
   ===================== */

  reset() {
    this.resetInquiry();
    this.resetInputs();
  };

  resetInputs() {
    this.enrollmentRequest = this.initialEnrollmentRequest();
  };

  resetInquiry(retainTblData = false) {
    if (!retainTblData) this.inquiryData = [];
    this.searchFields = this.getSearchFields();
  };

  getSearchFields() {
    return [
      {
        index: 'refNo',
        label: 'Reference Number',
        value: null,
        type: 'text',
        props: { maxLength: 50}
      },
      {
        index: 'firstNm',
        label: 'First Name',
        value: null,
        type: 'text',
        props: { maxLength: 50, onlyLetterSp: true }
      },
      {
        index: 'lastNm',
        label: 'Last Name',
        value: null,
        type: 'text',
        props: { maxLength: 50, onlyLetterSp: true }
      },
    ];
  };

  /* =====================
  FACTORY METHODS
  ===================== */

  async getDocumentTypeList() {
    return await api.get.getDocumentTypeList();
  };

  initialEnrollmentRequest() {
    return {
      userId: null,
      documentType: null,
      purpose: null,
      dateRequested: null,
      status: null,
    };
  };

  validateRequest(requestObj, onSucc, onErr) {
    api.post.postRequest(
      '/document/validateRequest',
      requestObj,
      onSucc,
      onErr
    );
  };

  saveRequest(requestObj, onSucc, onErr) {
    api.post.postRequest(
      '/document/saveRequest',
      requestObj,
      onSucc,
      onErr
    );
  };

  previewRequest(requestObj, onSucc, onErr) {
    api.post.postRequest(
      '/document/previewRequest',
      requestObj,
      onSucc,
      onErr
    );
  };
  }

export default DocumentStore;
