import { makeAutoObservable } from 'mobx';
import api from '../api/api';

class DashboardStore {
  user = null;
  error = null;
  data={};

  constructor() {
    makeAutoObservable(this);
  };

  data={
    paramCount1: 0,
    paramLabel1: null,
    paramCount2: 0,
    paramLabel2: null,
    paramCount3: 0,
    paramLabel3: null
  };

  // #############################
  //          API calls
  // #############################
  async getDashboardData(roleKey) {
    return await api.get.getDashboardData(roleKey);
  };

};

export default DashboardStore;
