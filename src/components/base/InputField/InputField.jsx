import React, { Component } from 'react';
import { buildClassNames } from '../../../utils/ClassUtils';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value && !this.props.value) {
      this.setState({ error: null });
    }
  };

  handleChange = (e) => {
    const {
      type,
      onChange,
      isMobileNumber,
      onlyNumber,
      onlyLetterNumber,
      onlyLetterNumberSp,
      onlyLetterSp,
      isRequired
    } = this.props;

    let inputVal = e.target.value;
    let error = null;

    // Apply validations
    if (inputVal.trim() === '') {
      if (isRequired) {
        error = 'This field is required';
      }
      // Convert empty strings to null
      inputVal = null;
    } else {
      if (type === 'number' || onlyNumber || isMobileNumber) {
        if (!/^\d*$/.test(inputVal)) {
          error = 'Only numbers are allowed';
        }
      } else if (onlyLetterNumber) {
        if (!/^[a-zA-Z0-9]*$/.test(inputVal)) {
          error = 'Only letters and numbers are allowed';
        }
      } else if (onlyLetterNumberSp) {
        if (!/^[a-zA-Z0-9 ]*$/.test(inputVal)) {
          error = 'Only letters, numbers, and spaces are allowed';
        }
      } else if (onlyLetterSp) {
        if (!/^[a-zA-Z\s]*$/.test(inputVal)) {
          error = 'Only letters and spaces are allowed';
        }
      } else if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputVal)) {
          error = 'Invalid email format';
        }
      }
    }

    this.setState({ error });

    // Fire parent onChange with cleaned value
    if (onChange) {
      // Create a synthetic event to keep consistency
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: inputVal
        }
      };
      onChange(syntheticEvent);
    }
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
    } = this.props;
    const { error } = this.state;

    return (
      <div className={buildClassNames('inputField_ctr', customClassName)}>
        <div className="inputField_hdr">
          <span>{label!=null ? label : ''}</span>
          {isRequired && <span className="isRequired_ast">*</span>}
        </div>

        <input
          type={type!=null ? type : 'text'}
          name={name}
          value={value!=null ? value : ''}
          onChange={this.handleChange}
          placeholder={placeholder!=null ? placeholder : `Enter ${label}`}
          maxLength={maxLength!=null ? maxLength : null}
          required={isRequired!=null ? isRequired : false}
          inputMode={isMobileNumber ? 'numeric' : undefined}
          pattern={isMobileNumber ? '[0-9]*' : undefined}
        />

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
