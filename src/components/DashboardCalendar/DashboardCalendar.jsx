import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class DashboardCalendar extends Component {
  state = {
    date: new Date()
  };

  onChange = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <div className="panel dashboard_calendar">
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default DashboardCalendar;