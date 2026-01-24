import { makeAutoObservable } from 'mobx';
import api from '../api/api';
import StepperContants from '../../contants/StepperContants';

class AnnouncementStore {
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
      // {
      //   index: 'lrn',
      //   label: 'LRN',
      //   value: null,
      //   type: 'text',
      //   props: { maxLength: 12, onlyNumber: true }
      // },
      {
        index: 'refNo',
        label: 'Reference Number',
        value: null,
        type: 'text',
        props: { maxLength: 50 }
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

  initialEnrollmentRequest() {
    return {
      recipientKeys: [],
      header: null,
      isSmsEmail: null,
      message: null,
      type: null,
      alertStatus: null,
    };
  };

  async getSmsTypeList() {
    return await api.get.getSmsTypeList();
  };

  async getAlertStatusList() {
    return await api.get.getAlertStatusList();
  };
  
  async getChannelList() {
    return await api.get.getChannelList();
  };

  async getAllResidentTypeList() {
    return await api.get.getAllResidentTypeList();
  };

  validateRequest(requestObj, onSucc, onErr) {
    api.post.postRequest(
      '/announcement/validateRequest',
      requestObj,
      onSucc,
      onErr
    );
  };

  saveRequest(requestObj, onSucc, onErr) {
    api.post.postRequest(
      '/announcement/saveRequest',
      requestObj,
      onSucc,
      onErr
    );
  };

  async searchAnnouncement(requestObj) {
    try {
      return await api.get.searchAnnouncement(requestObj);
    } catch (error) {
      console.error(error);
      return [];
    }
  };
}

export default AnnouncementStore;
