import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import { buildClassNames } from '../../../utils/ClassUtils';

class SelectField extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    const { options, onChange } = this.props;
    const selectedValue = e.target.value;

    if (selectedValue === '') {
      if (onChange) {
        onChange({ target: { value: null } });
      }
      return;
    }

    // Infer type from the first option's key
    const sampleKey = options?.[0]?.key;

    let parsedValue;
    if (typeof sampleKey === 'number') {
      parsedValue = Number(selectedValue);
    } else if (typeof sampleKey === 'string') {
      parsedValue = selectedValue;
    } else {
      parsedValue = selectedValue; // fallback
    }

    const selectedOption = options.find(option => option.key === parsedValue);

    if (onChange) {
      onChange({ target: { value: selectedOption } });
    }
  };

  render() {
    const {
      label,
      isRequired,
      options,
      customClassName,
      value,
      disabled,
      inst
    } = this.props;

    return (
      <div className={buildClassNames('selectField_ctr', customClassName)}>
        <div className='selectField_hdr'>
          <span>{label != null ? label : ''}</span>
          {isRequired && <span className='isRequired_ast'>*</span>}
        </div>

        <div className='selectField_opt'>
          {options && options.length > 0 ? (
            <select
              name={label || 'selectGroup'}
              value={value!=null ? value : ''}
              onChange={this.handleChange}
              className='select-dropdown'
              disabled={disabled}
            > 
              <option hidden>Choose {label} here.</option>
              {options.map((item, index) => (
                <option key={index} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
          ) : (
            <div className="no_options">No options available for {label}</div>
          )}
          {inst && <div className='input_inst'><small>{inst}</small></div>}
        </div>
      </div>
    );
  };
};

SelectField.contextType = StoreContext;

export default observer(SelectField);
