import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import { buildClassNames } from '../../../utils/ClassUtils';

class BaseButton extends Component {
  constructor(props) {
    super(props);
  }

  onClickBtn = () => {
    const { onClick } = this.props;
    if (onClick) onClick();   // just call it
  };

  render() {
    const { SettingsStore } = this.context.store;
    const {
      isDelete,
      isUpdate,
      label,
      hasIcon,
      icon,
      customClassName,
      type,
      hasIconPrefix
    } = this.props;
    
    let defaultBtnLabel = isDelete 
      ? 'Delete'
      : isUpdate
      ? 'Update'
      : '';

    return (
      <div className='btn_ctr'>
        <button
          className={buildClassNames(
            isDelete ? 'btn_delete' : '',
            isUpdate ? 'btn_update' : '',
            customClassName
          )}
          disabled={SettingsStore.isLoading ? true : false}
          type={type!=null ? type : 'button'}
          onClick={this.onClickBtn}>
            {/* <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div> */}
            {hasIcon && hasIconPrefix ? icon : null}
            {label!=null ? label : defaultBtnLabel}
            {hasIcon && !hasIconPrefix ? icon : null}
        </button>
      </div>
    );
  }
};

BaseButton.defaultProps = {
  hasIconPrefix: true
};

BaseButton.contextType = StoreContext;

export default observer(BaseButton);
