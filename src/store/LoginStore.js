import { makeAutoObservable, runInAction } from 'mobx';
import api from '../api/api.js';

class LoginStore {
  constructor() {
    makeAutoObservable(this);
  };

  user = null;
  error = null;
  userList = [];
  loginRequest = this.initialLoginRequest();

  initialLoginRequest() {
    return {
      cd: null,
      password: null
    };
  };


  
  //api calls
  async login(credentials, onSuccess, onError) {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await response.json();

      if (data.errorList?.length) {
        throw new Error(data.errorList.join(', '));
      }

      runInAction(() => {
        this.user = (data.user || data.content);
        this.error = null;
      });

      onSuccess?.(data);

    } catch (err) {
      runInAction(() => {
        this.loginRequest.password = null;
        this.error = err.message;
      });

      onError?.(err.message);
    }
  }

  async fetchSystemUserList() {
    try {
      const list = await api.get.getSystemUserListForLogin();
      runInAction(() => {
        this.userList = list;
      });
    } catch (err) {
      runInAction(() => {
        this.userList = [];
        this.error = err.message;
      });
    }
  }
}

export default LoginStore;