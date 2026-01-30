import { makeAutoObservable } from 'mobx';
import api from '../api/api';
import StepperContants from '../../contants/StepperContants';

class UserRequestStore {
  constructor() {

    this.resetInquiry();
    makeAutoObservable(this);
  };

  inquiryData = [];
  viewData = null;
  searchStep = StepperContants.INQUIRY_INITIAL;

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
        index: 'requestor',
        label: 'Requestor',
        value: null,
        type: 'text',
        props: { maxLength: 50 }
      },
    ];
  };

  async searchRequest(requestObj) {
    try {
      return await api.get.getRequestListBySearch(requestObj);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  async getRequestById(id) {
    try {
      return await api.get.getRequestById(id);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

processDocumentRequest(requestObj, onSucc, onErr) {
    api.post.postRequest(
      '/document/processDocument',
      requestObj,
      onSucc,
      onErr
    );
  };
}

export default UserRequestStore;
