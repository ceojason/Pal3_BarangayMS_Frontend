import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import MainStepper from '../base/MainStepper/MainStepper';
import StepperContants from '../../../contants/StepperContants';
import SearchHouseholdPanel from '../../components/SearchHouseholdPanel/SearchHouseholdPanel';
import HouseholdDetailView from '../../components/HouseholdDetailView/HouseholdDetailView';
import BaseButton from '../base/BaseButton/BaseButton';

class HouseholdStepper extends Component {
  constructor(props) {
    super(props);
  }

  onClickBack = () => {
    const { HouseholdStore } = this.context.store;

    HouseholdStore.viewData=null;
    HouseholdStore.searchStep = StepperContants.INQUIRY_INITIAL;
  };

  onClickUpdate = () => {
    const { HouseholdStore, SettingsStore } = this.context.store;
    let request = HouseholdStore.enrollmentRequest;

    SettingsStore.showModal({
      type: 'update',
      headerTitle: 'Update Community Report',
      valueToDisplay: 'this household',
      data: request,
      additionalBtn: (data, closeModal) => (
        <BaseButton
          customClassName="btn_update"
          label="Save"
          onClick={() => this.onProcessUpdate(data, closeModal)}
        />
      )
    });
  };

  onProcessUpdate = (data, closeModal) => {
    const { HouseholdStore, SettingsStore } = this.context.store;
    let request = HouseholdStore.enrollmentRequest;

    window.scrollTo(0, 0);
    HouseholdStore.validateAndUpdate(request, res => {
      SettingsStore.showSuccessPanel=true;
      SettingsStore.successMsg = {
        ackMessage: res.ackMessage
      };
      setTimeout(() => {
        SettingsStore.showSuccessPanel = false;
        SettingsStore.successMsg = {};
      }, 10000);
    }, error => {
      SettingsStore.showErrorPanel = true;
      SettingsStore.errorList = error;
      setTimeout(() => {
        SettingsStore.showErrorPanel = false;
        SettingsStore.errorList = [];
      }, 10000);
    });
    closeModal && closeModal();
  };

  render() {
    const { HouseholdStore } = this.context.store;

    const data = [
      {
        key: StepperContants.INQUIRY_INITIAL,
        content: (
          <SearchHouseholdPanel />
        )
      },
      {
        key: StepperContants.INQUIRY_VIEW,
        content: (
          <HouseholdDetailView
            data={HouseholdStore.viewData}
            header={'Household Information'}
            subHeader={'Below is the updated details of the selected household.'}
            onClickUpdate={() => this.onClickUpdate()}
            onClickBack={() => this.onClickBack()}
            isView={true}
            currentStep={1}
            totalSteps={1}
          />
        )
      }
    ];

    return (
      <Fragment>
        <MainStepper
          isInquiry={true}
          data={data}
          activeKey={HouseholdStore.searchStep}
        />
      </Fragment>
    );
  }
};

HouseholdStepper.contextType = StoreContext;

export default observer(HouseholdStepper);
