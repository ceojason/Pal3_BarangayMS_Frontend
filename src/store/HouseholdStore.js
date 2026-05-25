import { makeAutoObservable } from 'mobx';
import api from '../api/api';
import StepperContants from '../../contants/StepperContants';

class HouseholdStore {
  constructor() {

    this.reset();
    this.resetInquiry();
    makeAutoObservable(this);
  };

  errorList = [];
  inquiryData = [];
  viewData = null;
  
  searchStep = StepperContants.INQUIRY_INITIAL;

  reset() {
    this.resetInquiry();
    this.resetInputs();
  };

  resetInputs() {
    this.enrollmentRequest = this.initialEnrollmentRequest();
  };

  initialEnrollmentRequest() {
    return {
      id: null,
      userId: null,
      fullName: null,
      homeAddress: null,
    };
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
        index: 'requestor',
        label: 'Household Head',
        value: null,
        type: 'text',
        props: { maxLength: 50, onlyLetterSp: true }
      },
    ];
  };

  async search(requestObj) {
    try {
      return await api.get.searchHousehold(requestObj);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  async findMembersById(id) {
    return await api.get.findMembersById(id);
  };

  async getStatusListForHousehold() {
    return await api.get.getStatusListForHousehold();
  };

  validateAndUpdate(requestObj, onSuccess, onError) {
    api.post.postRequest(
      '/household/update',
      requestObj,
      onSuccess,
      onError
    );
  };
}

export default HouseholdStore;
