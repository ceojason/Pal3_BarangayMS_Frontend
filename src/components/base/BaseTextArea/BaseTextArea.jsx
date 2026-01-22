import React, { Component, Fragment } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';

class BaseTextArea extends Component {
  render() {
    const {
      label,
      rows = 5,
      value,
      onChange,
      maxLength,
      placeholder,
      disabled,
      isRequired
    } = this.props;

    return (
      <Fragment>
        {label && <span className="textarea_label">{label}</span>}
        {isRequired && <span className="isRequired_ast">*</span>}
        <textarea
          rows={rows}
          value={value || ''}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          className="textarea_body"
        />
      </Fragment>
    );
  }
}

BaseTextArea.contextType = StoreContext;
export default observer(BaseTextArea);