import React, { Component } from 'react';
import { buildClassNames } from '../../../utils/ClassUtils';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      showPassword: false, // for password toggle
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value && !this.props.value) {
      this.setState({ error: null });
    }
  }

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

    if (inputVal.trim() === '') {
      if (isRequired) error = 'This field is required';
      inputVal = null;
    } else {
      if (type === 'number' || onlyNumber || isMobileNumber) {
        if (!/^\d*$/.test(inputVal)) error = 'Only numbers are allowed';
      } else if (onlyLetterNumber) {
        if (!/^[a-zA-Z0-9]*$/.test(inputVal)) error = 'Only letters and numbers are allowed';
      } else if (onlyLetterNumberSp) {
        if (!/^[a-zA-Z0-9 ]*$/.test(inputVal)) error = 'Only letters, numbers, and spaces are allowed';
      } else if (onlyLetterSp) {
        if (!/^[a-zA-Z\s]*$/.test(inputVal)) error = 'Only letters and spaces are allowed';
      } else if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputVal)) error = 'Invalid email format';
      }
    }

    this.setState({ error });

    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: inputVal }
      };
      onChange(syntheticEvent);
    }
  }

  togglePassword = () => {
    this.setState((prev) => ({ showPassword: !prev.showPassword }));
  }

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
      inst
    } = this.props;

    const { error, showPassword } = this.state;

    // Use 'text' if showing password
    const inputType = type === 'password' && showPassword ? 'text' : type || 'text';

    return (
      <div className={buildClassNames('inputField_ctr', customClassName)}>
        <div className="inputField_hdr">
          <span>{label || ''}</span>
          {isRequired && <span className="isRequired_ast">*</span>}
        </div>

        <div className="input_wrapper" style={{ position: 'relative' }}>
          <input
            type={inputType}
            name={name}
            value={value || ''}
            onChange={this.handleChange}
            placeholder={placeholder || `Enter ${label}`}
            maxLength={maxLength || null}
            required={isRequired || false}
            inputMode={isMobileNumber ? 'numeric' : undefined}
            pattern={isMobileNumber ? '[0-9]*' : undefined}
          />

          {/* Show/hide button for password */}
          {type === 'password' && (
            <button
              type="button"
              onClick={this.togglePassword}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontSize: '20px',
                color: '#05714B',
                fontWeight: 600
              }}
            >
              {showPassword ? <i class="bi bi-eye-slash-fill"></i> : <i class="bi bi-eye-fill"></i>}
            </button>
          )}
        </div>

        {inst && <div className='input_inst'><small>{inst}</small></div>}
        {error && <div className="inputField_error"><small>{error}</small></div>}
      </div>
    );
  }
}

export default InputField;