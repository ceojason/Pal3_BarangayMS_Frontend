import React, { Component } from 'react';
import { buildClassNames } from '../../../utils/ClassUtils';

class InputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      showPassword: false,
      isFocused: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value && !this.props.value) {
      this.setState({ error: '' });
    }
  }

  validateInput = (value) => {
    const {
      type,
      isMobileNumber,
      onlyNumber,
      onlyLetterNumber,
      onlyLetterNumberSp,
      onlyLetterSp,
      isRequired
    } = this.props;

    if (!value || value.trim() === '') {
      return isRequired ? 'This field is required' : '';
    }

    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value)) {
        return 'Invalid email format';
      }
    }

    if (type === 'number' || onlyNumber || isMobileNumber) {
      if (!/^\d+$/.test(value)) {
        return 'Only numbers are allowed';
      }
    }

    if (onlyLetterNumber) {
      if (!/^[a-zA-Z0-9]+$/.test(value)) {
        return 'Only letters and numbers are allowed';
      }
    }

    if (onlyLetterNumberSp) {
      if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
        return 'Only letters, numbers, and spaces are allowed';
      }
    }

    if (onlyLetterSp) {
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        return 'Only letters and spaces are allowed';
      }
    }

    return '';
  };

  handleChange = (e) => {
    const { onChange } = this.props;

    let value = e.target.value;

    const error = this.validateInput(value);

    this.setState({ error });

    if (onChange) {
      onChange({
        ...e,
        target: {
          ...e.target,
          value
        }
      });
    }
  };

  togglePassword = () => {
    this.setState((prev) => ({
      showPassword: !prev.showPassword
    }));
  };

  render() {
    const {
      label,
      placeholder,
      maxLength,
      isRequired,
      type,
      customClassName,
      isMobileNumber,
      value,
      name,
      inst,
      disabled,
      icon,
      currency
    } = this.props;

    const { error, showPassword, isFocused } = this.state;

    const inputType =
      type === 'password'
        ? showPassword
          ? 'text'
          : 'password'
        : type || 'text';

    return (
      <div className={buildClassNames('inputField_ctr', customClassName)}>
        {/* LABEL */}
        {label && (
          <label className="inputField_hdr">
            <span>{label}</span>

            {isRequired && (
              <span className="isRequired_ast">*</span>
            )}
          </label>
        )}

        {/* INPUT WRAPPER */}
        <div
          className={buildClassNames(
            'input_wrapper',
            error && 'input_error',
            isFocused && 'input_focus',
            disabled && 'input_disabled',
            currency && 'input_has_currency'
          )}
        >
          {/* LEFT ICON */}
          {icon && (
            <div className="input_icon">
              {icon}
            </div>
          )}

          {/* ₱ PREFIX */}
          {currency && (
            <div className="input_currency_prefix" style={{ marginRight: '5px' }}>
              ₱
            </div>
          )}

          <input
            type={inputType}
            name={name}
            value={value || ''}
            onChange={this.handleChange}
            placeholder={placeholder || `Enter ${label || ''}`}
            maxLength={maxLength}
            disabled={disabled}
            inputMode={isMobileNumber ? 'numeric' : undefined}
            pattern={isMobileNumber ? '[0-9]*' : undefined}
            autoComplete="off"
            onFocus={() => this.setState({ isFocused: true })}
            onBlur={() => this.setState({ isFocused: false })}
          />

          {/* PASSWORD TOGGLE */}
          {type === 'password' && (
            <button
              type="button"
              className="password_toggle_btn"
              onClick={this.togglePassword}
              tabIndex="-1"
            >
              {showPassword ? (
                <i className="bi bi-eye-slash-fill"></i>
              ) : (
                <i className="bi bi-eye-fill"></i>
              )}
            </button>
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

export default InputField;