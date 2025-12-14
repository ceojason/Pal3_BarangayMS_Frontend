import { makeAutoObservable, observable, action, runInAction } from 'mobx';
import StepperContants from '../../contants/StepperContants';
import api from '../api/api';

class StudentEnrollmentStore {
  constructor() {
    makeAutoObservable(this, {
    });
  };
  
  errorList=[];
  sectionList=[];
  strandsList=[];
  ackHeader={
    ackMessage: null,
    refNo: null
  };
  currentStep=StepperContants.MANUAL_ENROLL_CREATE;
  searchStep=StepperContants.INQUIRY_INITIAL;
  enrollmentRequest=this.initialEnrollmentRequest();
  searchFields=this.getSearchFields();
  inquiryData=[];
  viewData=null;

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
        props: {
          maxLength: 12,
          onlyNumber: true
        }
      },
      {
        index: 'firstNm',
        label: 'First Name',
        value: null,
        type: 'text',
        props: {
          maxLength: 50,
          onlyLetterSp: true
        }
      },
      {
        index: 'lastNm',
        label: 'Last Name',
        value: null,
        type: 'text',
        props: {
          maxLength: 50,
          onlyLetterSp: true
        }
      },
      // {
      //   index: 'emailAddress',
      //   label: 'Email Address',
      //   value: null,
      //   type: 'text',
      //   props: {
      //     maxLength: 255,
      //     type: 'email'
      //   }
      // }
    ];
  };

  reset() {
    this.currentStep = StepperContants.MANUAL_ENROLL_CREATE;
    this.searchStep = StepperContants.INQUIRY_INITIAL;
    this.resetInputs();
  };

  resetInputs() {
    this.enrollmentRequest = this.initialEnrollmentRequest();
  };

  resetInquiry(retainTblData) {
    if (!retainTblData) this.inquiryData=[];
    this.searchFields = this.getSearchFields();
  };

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


  //post request apis
  validateEnrollment = (requestObj, onSuccess, onError) => {
    api.post.postRequest('/studentEnrollment/validateEnrollment', requestObj, onSuccess, onError);
  };

  validateEnrollmentNotInitial = (requestObj, onSuccess, onError) => {
    api.post.postRequest('/studentEnrollment/validateEnrollmentNotInitial', requestObj, onSuccess, onError);
  };

  saveEnrollment = (requestObj, onSuccess, onError) => {
    api.post.postRequest('/studentEnrollment/saveEnrollment', requestObj, onSuccess, onError);
  };

  //get request apis
  searchStudents = async (requestObj) => {
    try {
      const result = await api.get.getStudentListBySearch(requestObj);
      return result;
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  };

  deleteStudent = async (lrn, onSuccess, onError) => {
    try {
      const result = await api.get.deleteStudentByLrn(lrn);
      if (onSuccess) onSuccess(result);
    } catch (error) {
      if (onError) {
        const errorList = error?.errorList || [error.message || 'Something went wrong'];
        onError(errorList);
      }
    }
  };


}

export default StudentEnrollmentStore;
