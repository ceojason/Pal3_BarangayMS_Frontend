import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';

class MessageModal extends Component {
  render() {
    const { show, content, onClose, hasIcon } = this.props;

    if (!show) return null;

    return (
      <div className="message_modal">
        <div className="message_modal_body">
          <h3>
            <i className="bi bi-envelope-check-fill"></i>
            Message Details
          </h3>

          <p className='white_line'>
            {hasIcon && <i className="bi bi-caret-right-fill"></i>}
            {content}
          </p>

          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
}

MessageModal.contextType = StoreContext;

export default observer(MessageModal);