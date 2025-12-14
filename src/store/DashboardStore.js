import { makeAutoObservable } from 'mobx';

class DashboardStore {
  user = null;
  error = null;

  constructor() {
    makeAutoObservable(this);
  };

};

export default DashboardStore;
