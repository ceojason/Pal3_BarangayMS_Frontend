import { makeAutoObservable } from 'mobx';
import api from '../api/api';
import StepperContants from '../../contants/StepperContants';

class CommunityReportStore {
  constructor() {

    this.reset();
    this.resetInquiry();
    makeAutoObservable(this);
  };

  errorList = [];
  inquiryData = [];
  viewData = null;

  currentStep = StepperContants.MANUAL_ENROLL_CREATE;
  searchStep = StepperContants.INQUIRY_INITIAL;

  ackHeader = {
    ackMessage: null,
    refNo: null
  };

  resetInquiry(retainTblData = false) {
    if (!retainTblData) this.inquiryData = [];
    this.searchFields = this.getSearchFields();
  };

  reset() {
    this.resetInquiry();
    this.resetInputs();
  };
  
  resetInputs() {
    this.enrollmentRequest = this.initialEnrollmentRequest();
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
        index: 'requestor',
        label: 'Reporter',
        value: null,
        type: 'text',
        props: { maxLength: 50 }
      },
    ];
  };

  initialEnrollmentRequest() {
    return {
      fullName: null,
      residentId: null,
      block: null,
      lot: null,
      street: null,
      phaseKey: null,
      phaseString: null,

      reportTypeKey: null,
      othTitle: null,
      description: null,
      happensNearOrInHousehold: null,
      location: null,
      status: null,
      assigneeId: null,
      priorityKey: null,
      priorityKeyString: null,
      attachments: [],
      remarks: null
    };
  };

  validateRequest(requestObj, onSucc, onErr) {
    api.post.postMultipartRequest(
      '/commReport/validateRequest',
      requestObj,
      onSucc,
      onErr
    );
  };

  validateAndUpdate(requestObj, onSuccess, onError) {
    api.post.postRequest(
      '/commReport/update',
      requestObj,
      onSuccess,
      onError
    );
  };

  saveRequest(requestObj, onSucc, onErr) {
    api.post.postMultipartRequest(
      '/commReport/saveRequest',
      requestObj,
      onSucc,
      onErr
    );
  };

  async searchRequest(requestObj) {
    try {
      return await api.get.getCommReportList(requestObj);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  async getBrgyOfficialList() {
    return await api.get.getBrgyOfficialList();
  };

  async getStatusListForCommReport() {
    return await api.get.getStatusListForCommReport();
  };

  async getReportTypeList() {
    return await api.get.getReportTypeList();
  };

  async reportPriorityList() {
    return await api.get.getPriorityList();
  };
}

export default CommunityReportStore;
