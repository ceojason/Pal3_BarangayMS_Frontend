import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import MainStepper from '../base/MainStepper/MainStepper';
import StepperContants from '../../../contants/StepperContants';
import UserRequestPanel from '../UserRequestPanel/UserRequestPanel';
import UserRequestView from '../UserRequestView/UserRequestView';

class UserRequestStepper extends Component {
  constructor(props) {
    super(props);
  }

  onClickBack = () => {
    const { UserRequestStore } = this.context.store;

    UserRequestStore.viewData=null;
    UserRequestStore.searchStep = StepperContants.INQUIRY_INITIAL;
  };

  render() {
    const { header, subHeader, isPending } = this.props;
    const { UserRequestStore } = this.context.store;

    const data = [
      {
        key: StepperContants.INQUIRY_INITIAL,
        content: (
          <UserRequestPanel 
            header={header}
            subHeader={subHeader}
            isPending={isPending}
          />
        )
      },
      {
        key: StepperContants.INQUIRY_VIEW,
        content: (
          <UserRequestView
            header={header}
            subHeader={subHeader}
            data={UserRequestStore.viewData}
            isPending={isPending}
            onClickBack={() => this.onClickBack()}
            currentStep={1}
            totalSteps={1}
            ref={viewRef => {
              if (viewRef==null) this.viewRef = viewRef;
            }}
          />
        )
      }
    ];

    return (
      <Fragment>
        <MainStepper isInquiry={true} data={data} activeKey={UserRequestStore.searchStep} />
      </Fragment>
    );
  }
};

UserRequestStepper.contextType = StoreContext;

export default observer(UserRequestStepper);
