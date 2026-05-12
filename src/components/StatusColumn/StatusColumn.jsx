import React, { Component } from 'react';
import {
  getSystemStatusByKey
} from '../../utils/SystemStatusEnum';

class StatusColumn extends Component {

  render() {

    const { statusKey } = this.props;

    const status = getSystemStatusByKey(statusKey);

    if (!status) {
      return (
        <span className="status_badge status_default">
          Unknown
        </span>
      );
    }

    return (
      <span className={`status_badge ${status.className}`}>
        {status.dscp}
      </span>
    );
  }
}

export default StatusColumn;