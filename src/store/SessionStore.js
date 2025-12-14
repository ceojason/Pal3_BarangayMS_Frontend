import { makeAutoObservable, runInAction } from 'mobx';
import api from '../api/api';

class SessionStore {

  constructor() {
    makeAutoObservable(this);
  };

  currentUser = null;
  hasSession = false;
  sessionId = null;
  loading = false;

  setUser(user) {
    if (user!=null && user!=undefined) {
      this.currentUser=user;
      this.loading = false;
    }
  };

  fetchUser = async () => {
    this.loading = true;
    this.error = null;

    try {
      const data = await api.get.getDummyUser();
      runInAction(() => {
        this.setUser(data);
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message;
        this.loading = false;
      });
    }
  };

}

export default SessionStore;