import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import MainStepper from '../base/MainStepper/MainStepper';
import StepperContants from '../../../contants/StepperContants';
import SearchUsersPanel from '../../components/SearchUsersPanel/SearchUsersPanel';
import UsersViewPanel from '../UsersViewPanel/UsersViewPanel';

class SearchUsersStepper extends Component {
  constructor(props) {
    super(props);
  }

  onClickBack = () => {
    const { UsersStore } = this.context.store;

    UsersStore.viewData=null;
    UsersStore.searchStep = StepperContants.INQUIRY_INITIAL;
  };

  render() {
    const { UsersStore } = this.context.store;

    const data = [
      {
        key: StepperContants.INQUIRY_INITIAL,
        content: <SearchUsersPanel />
      },
      {
        key: StepperContants.INQUIRY_VIEW,
        content: (
          <UsersViewPanel 
            data={UsersStore.viewData} 
            header={'User Information'}
            subHeader={'The information below is the updated information of the user.'}
            onClickBack={() => this.onClickBack()}
            isView={true}
          />
        )
      }
    ];

    return (
      <Fragment>
        <MainStepper isInquiry={true} data={data} activeKey={UsersStore.searchStep} />
      </Fragment>
    );
  }
};

SearchUsersStepper.contextType = StoreContext;

export default observer(SearchUsersStepper);
