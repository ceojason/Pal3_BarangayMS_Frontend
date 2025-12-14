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
    onClick&&onClick();
  };

  render() {
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
          type={type!=null ? type : 'button'}
          onClick={this.onClickBtn}>
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
