import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import MainContainer from '../base/MainContainer/MainContainer';
import AddStudentStepper from '../AddStudentStepper/AddStudentStepper';
import UploadStudentStepper from '../UploadStudentStepper/UploadStudentStepper';
import BaseTabs from '../base/BaseTabs/BaseTabs';

class AddStudentPanel extends Component {
  static contextType = StoreContext;

  componentDidMount() {
    this.onReset();
  };

  onReset = () => {
    const { StudentEnrollmentStore, SettingsStore } = this.context.store;
    SettingsStore.isInitialSearch = true;
    StudentEnrollmentStore.reset();
    StudentEnrollmentStore.resetInquiry();
  };

  handleTabChange = () => {
    this.onReset();
  };

  render() {
    const tabs = [
      {
        label: 'Manual Enrollment',
        content: <AddStudentStepper />
      },
      {
        label: 'Upload Enrollment',
        content: <UploadStudentStepper />
      }
    ];

    return (
      <MainContainer
        header={'Student Enrollment Page'}
        subHeader={"Add student/s through manual process or bulk enrollment through upload."}>
         <BaseTabs tabs={tabs} onTabChange={this.handleTabChange} />
      </MainContainer>
    );
  }
}

export default observer(AddStudentPanel);