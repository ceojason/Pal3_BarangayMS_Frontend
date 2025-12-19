import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseNotificationModal from '../BaseNotificationModal/BaseNotificationModal';
import BaseConfirmModal from '../BaseConfirmModal/BaseConfirmModal';

class MainContainer extends Component {
  static contextType = StoreContext;

  render() {
    const { header, subHeader, children, isInquiry } = this.props;
    const { SettingsStore } = this.context.store;

    const { customModal } = SettingsStore;

    return (
      <div className='body_container'>
        {(/** SettingsStore.showSuccessModal ||  */SettingsStore.showErrorModal) && (
          <BaseNotificationModal {...SettingsStore.customModal} />
        )}

        {SettingsStore.showConfirmModal && (
          <BaseConfirmModal {...SettingsStore.customModal} />
        )}

        {SettingsStore.isScreenLoading ? (
          <div className='api-backdrop' />
        ) : <></>}

        <div className='main_hdr'>
          <span className='header'>{header}</span>
          <span className='sub_header'>{subHeader}</span>
        </div>

        <div className='main_content'>{children}</div>
      </div>
    );
  }
}

export default observer(MainContainer);