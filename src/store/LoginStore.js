import { makeAutoObservable, runInAction } from 'mobx';
import api from '../api/api.js';

class LoginStore {
  constructor() {
    makeAutoObservable(this);
  };

  user = null;
  error = null;
  token = null;
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errorList || 'Login failed');
      }

      runInAction(() => {
        this.user = {
          userCd: data.userCd,
          role: data.role,
        };
        this.token = data.token;
        this.error = null;
      });

      localStorage.setItem('token', data.content.token);
      onSuccess?.(data);

    } catch (err) {
      runInAction(() => {
        this.loginRequest.password = null;
        this.error = err.message || 'Login failed';
      });

      // Clear error after 3 seconds
      setTimeout(() => {
        runInAction(() => {
          this.error = null;
        });
      }, 5000);

      onError?.(err.message);
    }
  };

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