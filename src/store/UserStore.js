import { makeAutoObservable, runInAction } from 'mobx';
import api from '../api/api';

class UserStore {
  user = null;
  error = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchUser = async () => {
    this.loading = true;
    this.error = null;

    try {
      const data = await api.get.getDummyUser();
      runInAction(() => {
        this.user = data;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message;
        this.loading = false;
      });
    }
  };
}

export default UserStore;