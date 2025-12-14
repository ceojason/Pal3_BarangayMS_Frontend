import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';

class UploadStudentStepper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      </div>
    );
  }
};

UploadStudentStepper.contextType = StoreContext;

export default observer(UploadStudentStepper);
