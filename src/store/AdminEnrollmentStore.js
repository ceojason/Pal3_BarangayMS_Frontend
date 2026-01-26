import { makeAutoObservable } from 'mobx';
import api from '../api/api';
import StepperContants from '../../contants/StepperContants';

class AdminEnrollmentStore {
  constructor() {

    this.reset();
    makeAutoObservable(this);
  };

  errorList=[];
  ackHeader={
    ackMessage: null,
    refNo: null
  };
  currentStep=StepperContants.MANUAL_ENROLL_CREATE;
  searchStep=StepperContants.INQUIRY_INITIAL;

  enrollmentRequest = {};

  reset() {
    this.resetInputs();
  };

  resetInputs() {
    this.enrollmentRequest = this.initialEnrollmentRequest();

  };

  initialEnrollmentRequest() {
    return {
      firstNm: null,
      middleNm: null,
      lastNm: null,
      bday: null,
      gender: 'M',
      homeAddress: null,
      mobileNo: null,
      emailAddress: null,
      status: null,
      dateEnrolled: null
    };
  };


  reset() {
    this.currentStep = StepperContants.MANUAL_ENROLL_CREATE;
    this.searchStep = StepperContants.INQUIRY_INITIAL;
    this.resetInputs();
  };

  resetInputs() {
    this.inputs = this.initialEnrollmentRequest();
  };

  async getGenderList() {
    return await api.get.getGenderListStr();
  };

  //post request apis
  validateEnrollment = (requestObj, onSuccess, onError) => {
    api.post.postRequest('/administrator/validateEnrollment', requestObj, onSuccess, onError);
  };

  async getAdminProfileImage(userId) {
    return await api.get.getAdminProfileImage(userId);
  };

  async findAdmindataById(userId) {
    return await api.get.findAdmindataById(userId);
  };

  validateAndUpdate(requestObj, onSuccess, onError) {
    api.post.postRequest(
      '/administrator/update',
      requestObj,
      onSuccess,
      onError
    );
  };
}

export default AdminEnrollmentStore;
