import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';

class NoAccessCtr extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='no_access_ctr'>
        <span>
          <i class="bi bi-pc-display-horizontal"></i>
          Sorry, you have no access for this page.
        </span>
      </div>
    );
  }
};

NoAccessCtr.contextType = StoreContext;

export default observer(NoAccessCtr);
