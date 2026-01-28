import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import InquiryPanel from '../base/InquiryPanel/InquiryPanel';

class UserRequestPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { header, subHeader } = this.props;

    return (
      <Fragment>
        <InquiryPanel
          header={header}
          subHeader={subHeader}
          
        />
      </Fragment>
    );
  }
};

UserRequestPanel.contextType = StoreContext;

export default observer(UserRequestPanel);
