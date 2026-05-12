import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';

class ProcessFeeCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;

    return (
      <div className="fee-card">
        <div className="fee-info">
          <div className="fee-label">Processing Fee</div>

          <div className="fee-value">
            ₱ {Number(data).toFixed(2)}
          </div>

          {Number(data) === 0 && (
            <span className="fee-badge-free">FREE</span>
          )}
        </div>

        <div className="fee-icon">
          ₱
        </div>

        <span className="fee-badge-official">Official Fee</span>
      </div>
    );
  }
};

ProcessFeeCard.contextType = StoreContext;

export default observer(ProcessFeeCard);
