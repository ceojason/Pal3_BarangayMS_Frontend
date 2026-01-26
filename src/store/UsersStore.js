import { makeAutoObservable } from 'mobx';
import api from '../api/api';
import StepperContants from '../../contants/StepperContants';

class UsersStore {
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

  async getProfileImage(userId) {
    return await api.get.getProfileImage(userId);
  };

  async searchUsers(requestObj) {
    try {
      return await api.get.getUsersListBySearch(requestObj);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  async findUserdataById(userId) {
    return await api.get.findUserdataById(userId);
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

  validateAndUpdate(requestObj, onSuccess, onError) {
    api.post.postRequest(
      '/users/update',
      requestObj,
      onSuccess,
      onError
    );
  };

  deleteUser(userId, onSuccess, onError) {
    api.del.deleteRecord(
      '/users/delete',
      userId,
      onSuccess,
      onError
    )
  };

  uploadImageToServer = async (file, userId, onSuccess, onError) => {
    await api.post.uploadProfileImage(userId, file, onSuccess, onError);
  };
}

export default UsersStore;
