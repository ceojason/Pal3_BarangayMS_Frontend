import { makeAutoObservable } from 'mobx';
import api from '../api/api';
import StepperContants from '../../contants/StepperContants';

class UsersStore {
  constructor() {

    this.reset();

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
    // this.resetInquiry();
    this.resetInputs();
  };

  resetInputs() {
    this.enrollmentRequest = this.initialEnrollmentRequest();

  };

  /* =====================
  FACTORY METHODS
  ===================== */

  initialEnrollmentRequest() {
    return {
      firstNm: null,
      middleNm: null,
      lastNm: null,
      suffix: null,
      birthDt: null,
      birthPlace: null,
      gender: null,
      civilStatusKey: null,
      mobileNo: null,
      emailAddress: null,
      phaseKey: null,
      homeAddress: null,
      householdKey: null,
      occupation: null,
      religion: null,
      isRegisteredVoter: null,
      residentClassKeys: [],
      //educationStatus: null,
      status: null,
    };
  };

  /* =====================
   API CALLS
   ===================== */

  async getGenderList() {
    return await api.get.getGenderListStr();
  };

  async getCivilStatusList() {
    return await api.get.getCivilStatusList();
  };

  async getPhaseList() {
    return await api.get.getPhaseList();
  };

  async getYesNoList() {
    return await api.get.getYesNoList();
  };

  async getResidentTypeList() {
    return await api.get.getResidentTypeList();
  };

  validateEnrollment(requestObj, onSucc, onErr) {
    api.post.postRequest(
      '/users/validateEnrollment',
      requestObj,
      onSucc,
      onErr
    );
  };

  saveEnrollment(requestObj, onSuccess, onError) {
      api.post.postRequest(
        '/users/saveEnrollment',
        requestObj,
        onSuccess,
        onError
      );
    };
}

export default UsersStore;
