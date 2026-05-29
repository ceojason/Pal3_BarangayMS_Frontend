import { makeAutoObservable } from 'mobx';
import api from '../api/api';

class SystemConfigStore {
  constructor() {

    this.reset();
    makeAutoObservable(this);
  };
  

  reset() {
    this.resetInputs();
  };

  resetInputs() {
    this.enrollmentRequest = this.initialEnrollmentRequest();

  };

  initialEnrollmentRequest() {
    return {
      configCd: null,

      barangayNm: null,
      municipalAddress: null,
      province: null,
      zipCode: null,
      region: null,
      country: 'PHILIPPINES',

      string1: null,
      string2: null,
      string3: null,
      string4: null,
      string5: null,
      string6: null,
      string7: null,
      string8: null,
      string9: null,
      string10: null,

      maintenanceMoode: null
    };
  };

  async getConfigList() {
    return await api.get.getConfigList();
  };

  async getRegionList() {
    return await api.get.getRegionList();
  };

  async getBarangayDetails() {
    return await api.get.getBarangayDetails();
  };

  async getHotlines() {
    return await api.get.getHotlines();
  };

  async getFeePricingList() {
    return await api.get.getFeePricingList();
  };

  validateAndUpdate(requestObj, onSuccess, onError) {
    api.post.postRequest(
      '/config/validateAndUpdate',
      requestObj,
      onSuccess,
      onError
    );
  };
}

export default SystemConfigStore;
