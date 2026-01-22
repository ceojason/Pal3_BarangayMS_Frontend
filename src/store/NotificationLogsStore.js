import { makeAutoObservable } from 'mobx';
import api from '../api/api';

class NotificationLogsStore {
  constructor() {

    this.resetInquiry();
    makeAutoObservable(this);
  };
  
  inquiryData = [];
  viewData = null;

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
        index: 'recipient',
        label: 'Recipient',
        value: null,
        type: 'text',
        props: { maxLength: 50 }
      },
    ];
  };

  /* =====================
   API CALLS
   ===================== */

  async searchNotifLogs(requestObj) {
      try {
        return await api.get.getNotifLogsBySearch(requestObj);
      } catch (error) {
        console.error(error);
        return [];
      }
    };
}

export default NotificationLogsStore;
