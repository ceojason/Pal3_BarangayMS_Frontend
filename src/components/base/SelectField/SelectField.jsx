import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import { buildClassNames } from '../../../utils/ClassUtils';

class SelectField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      isFocused: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value && !this.props.value) {
      this.setState({ error: '' });
    }
  }

  validateInput = (value) => {
    const { isRequired } = this.props;

    if (
      isRequired &&
      (value === null ||
        value === undefined ||
        value === '')
    ) {
      return 'This field is required';
    }

    return '';
  };

  handleChange = (e) => {
    const { options, onChange } = this.props;

    const selectedValue = e.target.value;

    // Empty value
    if (selectedValue === '') {
      const error = this.validateInput(null);

      this.setState({ error });

      if (onChange) {
        onChange({
          target: {
            value: null
          }
        });
      }

      return;
    }

    // Infer type from option key
    const sampleKey = options?.[0]?.key;

    let parsedValue;

    if (typeof sampleKey === 'number') {
      parsedValue = Number(selectedValue);
    } else {
      parsedValue = selectedValue;
    }

    const selectedOption = options.find(
      (option) => option.key === parsedValue
    );

    const error = this.validateInput(selectedOption);

    this.setState({ error });

    if (onChange) {
      onChange({
        target: {
          value: selectedOption
        }
      });
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
      inst,
      icon,
      name
    } = this.props;

    const { error, isFocused } = this.state;

    return (
      <div
        className={buildClassNames(
          'selectField_ctr',
          customClassName
        )}
      >
        {/* LABEL */}
        {label && (
          <label className="selectField_hdr">
            <span>{label}</span>

            {isRequired && (
              <span className="isRequired_ast">*</span>
            )}
          </label>
        )}

        {/* SELECT WRAPPER */}
        <div
          className={buildClassNames(
            'select_wrapper',
            error && 'select_error',
            isFocused && 'select_focus',
            disabled && 'select_disabled'
          )}
        >
          {/* LEFT ICON */}
          {icon && (
            <div className="select_icon">
              {icon}
            </div>
          )}

          {options && options.length > 0 ? (
            <>
              <select
                name={name || label || 'selectGroup'}
                value={value != null ? value : ''}
                onChange={this.handleChange}
                disabled={disabled}
                className="select_dropdown"
                onFocus={() =>
                  this.setState({ isFocused: true })
                }
                onBlur={() =>
                  this.setState({ isFocused: false })
                }
              >
                <option value="" hidden>
                  Choose {label || 'option'}
                </option>

                {options.map((item, index) => (
                  <option
                    key={index}
                    value={item.key}
                  >
                    {item.value}
                  </option>
                ))}
              </select>

              {/* CUSTOM DROPDOWN ICON */}
              <div className="select_arrow">
                <i className="bi bi-chevron-down"></i>
              </div>
            </>
          ) : (
            <div className="no_options">
              No options available for {label}
            </div>
          )}
        </div>

        {/* INSTRUCTION */}
        {inst && (
          <div className="input_inst">
            <small>{inst}</small>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="inputField_error">
            <small>{error}</small>
          </div>
        )}
      </div>
    );
  }
}

SelectField.contextType = StoreContext;

export default observer(SelectField);