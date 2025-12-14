import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';

class BaseNotificationModal extends Component {
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

BaseNotificationModal.contextType = StoreContext;

export default observer(BaseNotificationModal);
