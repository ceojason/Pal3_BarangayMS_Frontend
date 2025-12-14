import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseModal from '../BaseModal/BaseModal';

class MainForm extends Component {
  static contextType = StoreContext;

  handleModalClose = () => {
    const { SettingsStore } = this.context.store;
    SettingsStore.errorList = []; // clear errors to close modal
  };

  render() {

    return (
      <div className='main_form_ctr'>
        {this.props.children}
      </div>
    );
  }
}

export default observer(MainForm);