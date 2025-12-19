import { makeAutoObservable, runInAction } from 'mobx';
import StepperContants from '../../contants/StepperContants';
import api from '../api/api';

class StudentEnrollmentStore {

  constructor(snapshot) {
    if (snapshot) {
      Object.assign(this, snapshot);
    }

    this.reset();
    this.resetErrorList();
    this.resetInquiry();
    this.resetInputs();

    makeAutoObservable(this);
  }

  /* =====================
     OBSERVABLE STATES
     ===================== */

  errorList = [];
  inquiryData = [];
  viewData = null;

  currentStep = StepperContants.MANUAL_ENROLL_CREATE;
  searchStep = StepperContants.INQUIRY_INITIAL;

  enrollmentRequest = {};
  searchFields = [];

  ackHeader = {
    ackMessage: null,
    refNo: null
  };

  /* =====================
     RESET METHODS
     ===================== */

  reset() {
    this.currentStep = StepperContants.MANUAL_ENROLL_CREATE;
    this.searchStep = StepperContants.INQUIRY_INITIAL;
    this.ackHeader = { ackMessage: null, refNo: null };
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

  resetErrorList() {
    this.errorList = [];
  };

  /* =====================
     FACTORY METHODS
     ===================== */

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
      guardianFirstNm: null,
      guardianMiddleNm: null,
      guardianLastNm: null,
      guardianMobileNo: null,
      yearlevelKey: null,
      strandKey: null,
      sectionId: null,
      enrolleeTypeKey: null,
      status: null,
      dateEnrolled: null,
      hasEnrolledSubjects: false,
      lrn: null,
      enrolledSubjects: []
    };
  };

  getSearchFields() {
    return [
      {
        index: 'lrn',
        label: 'LRN',
        value: null,
        type: 'text',
        props: { maxLength: 12, onlyNumber: true }
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
      }
    ];
  };

  /* =====================
     API CALLS
     ===================== */

  async getGenderList() {
    return await api.get.getGenderListStr();
  };

  async getStrandList() {
    return await api.get.getStrandList();
  };

  async getYearlevelList() {
    return await api.get.getYearlevelList();
  };

  async getEnrolleeTypeList() {
    return await api.get.getEnrolleeTypeList();
  };

  async getSectionsList(yearlevelKey, strandKey) {
    return await api.get.getSectionList(yearlevelKey, strandKey);
  };

  async getSubjectList(yearlevelKey, strandKey) {
    return await api.get.getSubjectList(yearlevelKey, strandKey);
  };

  async getAssignedAdviser(sectionId) {
    return await api.get.getAssignedAdviser(sectionId);
  };

  async findStudentByLrn(lrn) {
    return await api.get.findStudentByLrn(lrn);
  };

  async searchStudents(requestObj) {
    try {
      return await api.get.getStudentListBySearch(requestObj);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  async deleteStudent(lrn, onSuccess, onError) { 
    try { 
      const result = await api.get.deleteStudentByLrn(lrn); onSuccess?.(result); 
    } catch (error) 
    { 
      console.log("jasonn error : ", error) 
      onError?.(error?.errorList || [error.message]);
    } 
  };

  validateEnrollment(requestObj, onSuccess, onError) {
    api.post.postRequest(
      '/studentEnrollment/validateEnrollment',
      requestObj,
      onSuccess,
      onError
    );
  };

  validateEnrollmentNotInitial = (requestObj, onSuccess, onError) => {
    api.post.postRequest('/studentEnrollment/validateEnrollmentNotInitial', 
      requestObj, 
      onSuccess, 
      onError);
  };

  saveEnrollment(requestObj, onSuccess, onError) {
    api.post.postRequest(
      '/studentEnrollment/saveEnrollment',
      requestObj,
      onSuccess,
      onError
    );
  };
}

export default StudentEnrollmentStore;