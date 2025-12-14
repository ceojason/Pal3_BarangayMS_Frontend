import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import { buildClassNames } from '../../../utils/ClassUtils';

class RadioButtonField extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(event.target.value);
    }
  };

  render() {
    const {
      label,
      value,
      options,
      customClassName,
      isRequired,
      name
    } = this.props;

    return (
      <div className={buildClassNames('radiobtnField_ctr', customClassName)}>
        <div className='radiobtnField_hdr'>
          <span>{label != null ? label : ''}</span>
          {isRequired && <span className='isRequired_ast'>*</span>}
        </div>

        {<div className='radiobtnField_opt'>
          {options && options.length > 0 ? (
            options.map((item, index) => {
              const itemLabel = item.value;
              const val = item.key;

              return (
                <div key={index} style={{ marginRight: '35px' }}>
                  <label className='radio-label'>
                    <input
                      type="radio"
                      name={name || label || 'radioGroup'}
                      value={val}
                      checked={value === val}
                      onChange={this.handleChange}
                    />
                    {itemLabel}
                  </label>
                </div>
              );
            })
          ) : (
            <div className="no_options">No options available for {label}</div>
          )}
        </div>}
      </div>
    );
  }
}

RadioButtonField.contextType = StoreContext;

export default observer(RadioButtonField);