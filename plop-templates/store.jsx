import { makeAutoObservable } from 'mobx';
import api from '../api/api';

class {{pascalCase name}}Store {
  constructor() {
    makeAutoObservable(this);
  };
  
}

export default {{pascalCase name}}Store;
