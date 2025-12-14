import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
    };
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
    // Optionally, update MobX store here:
    // this.context.store.setDate(date);
  };

  render() {
    const { selectedDate } = this.state;
    const { dateFormat } = this.props;

    return (
      <div style={{ margin: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Select Date:
        </label>

        <DatePicker
          selected={selectedDate}
          onChange={this.handleDateChange}
          dateFormat={dateFormat!=null ? dateFormat :"dd/MM/yyyy" }  // 👈 Change format here
          placeholderText="DD/MM/YYYY"
          className="date-picker-input"
        />

        {selectedDate && (
          <p style={{ marginTop: '10px' }}>
            Selected: {format(selectedDate, 'dd/MM/yyyy')}
          </p>
        )}
      </div>
    );
  }
}

CustomDatePicker.contextType = StoreContext;

export default observer(CustomDatePicker);