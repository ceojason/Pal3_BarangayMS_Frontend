import React, { Component, Fragment } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import { buildClassNames } from '../../../utils/ClassUtils';
import { ViewField } from '../ViewPortlet/ViewPortlet';

class GroupCheckboxesField extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (itemValue) => {
    const { store } = this.props;
    const idx = store.findIndex(id => id === itemValue);
    if (idx >= 0) {
      store.splice(idx, 1);
    } else {
      store.push(itemValue);
    }
  };

  getViewFieldsForCheckbox = () => {
    const { values, label } = this.props;

    return (
      <div className='groupcheckboxesview_ctr'>
        <div className='groupcheckboxesview_hdr'>
          <span>{label!=null ? label : ''}</span>
        </div>

        <div className='groupcheckboxesview_body'>
          {values && values.length>0 && values.map((item, index) => {
            return (
              <div className='groupcheckboxesview_body_opt'>
                <i class="bi bi-stickies-fill"></i>{item}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    const { 
      label,
      itemLabel,
      values, 
      customClassName, 
      store,
      value,
      startingIndex,
      keyValue,
      hasAutoCheckedKeys = [],
      isView
    } = this.props;

    if (isView) {
      return this.getViewFieldsForCheckbox();
    };

    return (
      <div className={buildClassNames('groupcheckboxes_ctr', customClassName)}>
        <div className='groupcheckboxes_hdr'>
          <span>{label != null ? label : ''}</span>
        </div>

        <div className='groupcheckboxes_body'>
          {values && values.length > 0 && values.map((item, index) => {
            const itemValue = item[value];
            
            // Start checked if enrolledSubjects contains itemValue OR
            // keyValue is in auto-check keys (initially checked)
            const isChecked = store.includes(itemValue) || hasAutoCheckedKeys.includes(keyValue);

            return (
              <CheckBoxComponent
                key={startingIndex != null ? startingIndex + index : index}
                label={item[itemLabel]} //per item label
                index={startingIndex != null ? startingIndex + index : index}
                isChecked={isChecked}
                onChange={() => this.handleChange(itemValue)}
                value={itemValue}
              />
            );
          })}
        </div>
      </div>
    );
  };
};

class CheckBoxComponent extends Component {

  render() {
    const { isChecked, label, index, onChange, value } = this.props;
    const id = `checkbox-${index}`;

    return (
      <Fragment>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={id}
            checked={isChecked}
            onChange={onChange}
            value={value}
          />
          <label className="form-check-label" htmlFor={id}>
            {label}
          </label>
        </div>
      </Fragment>
    );
  };
};

const CheckBoxField = observer(CheckBoxComponent);
GroupCheckboxesField.contextType = StoreContext;

export default observer(GroupCheckboxesField);
export { CheckBoxField };