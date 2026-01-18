import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';

class NoAccessCtr extends Component {
  constructor(props) {
    super(props);
  }

  redirectToLogin = () => {
    // Redirect to login page
    window.location.href = '/login';
  };

  render() {
    return (
      <div className='no_access_ctr' style={{ textAlign: 'center', marginTop: '50px' }}>
        <span>
          <i className="bi bi-pc-display-horizontal" style={{ marginRight: '8px' }}></i>
          Sorry, you have no access to this page.
        </span>

        <button 
          className='btn' 
          onClick={this.redirectToLogin}>
            Click here to redirect in the login page.
        </button>
      </div>
    );
  }
};

NoAccessCtr.contextType = StoreContext;

export default observer(NoAccessCtr);