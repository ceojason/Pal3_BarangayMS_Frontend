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

      maintenanceMoode: null
    };
  };

  async getConfigList() {
    return await api.get.getConfigList();
  };

  async getRegionList() {
    return await api.get.getRegionList();
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
