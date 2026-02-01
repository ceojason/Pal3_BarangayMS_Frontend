import { makeAutoObservable, runInAction } from 'mobx';
import api from '../api/api';
import RolePermissions from '../constants/others/RolePermissions';

class SessionStore {
  currentUser = null;
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user) {
    if (user) {
      this.currentUser = user;
      this.loading = false;
    }
  }

  fetchUser = async () => {
    this.loading = true;
    this.error = null;

    try {
      const data = await api.get.getSessionUser();
      runInAction(() => {
        this.setUser(data);
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message;
        this.loading = false;
      });
    }
  };

  fetchUser2 = async () => {
    // Prevent multiple fetches if already loading or user exists
    if (this.currentUser) return;

    this.loading = true;
    this.error = null;

    try {
      const data = await api.get.getSessionUser();
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

  get permissions() {
    if (!this.currentUser) return [];
    return RolePermissions[this.currentUser.roleKey] || [];
  }

  hasPermission = (permission) => {
    return this.permissions.includes(permission);
  };
}

export default SessionStore;