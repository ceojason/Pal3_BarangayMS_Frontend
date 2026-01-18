import React, { Component, Fragment } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import UsersViewPanel from '../../UsersViewPanel/UsersViewPanel';

class BaseAckPagePanel extends Component {
  constructor(props) {
    super(props);
    this.state={
      showDetails: false
    }
  };

  onClickShow = () => {
    this.setState({
      showDetails: !this.state.showDetails
    });
  };

  render() {
    const { ackMessage, refNo, isUser, data } = this.props;
    const { showDetails } = this.state;

    return (
      <Fragment>
        <div className="ack-page-container">
          <div className="alert-success-box slide-down">
            <div className="alert-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>

            <div className="alert-content">
              <div className="alert-title">
                {ackMessage ? ackMessage : ''}
              </div>
              <div className="alert-details">
                Reference Number <span>{refNo}</span>
                <button className='ack_pg_show_hide_btn' onClick={() => this.onClickShow()}>
                  {showDetails ? 'Hide Transaction Details' : 'Show Transaction Details'}
                  {showDetails ? <i class="bi bi-caret-up-fill"></i> : <i class="bi bi-caret-down-fill"></i>}
                </button>
              </div>
            </div>
          </div>
        </div>

        {(isUser && showDetails) ? (
          <UsersViewPanel 
            data={data}
            header={'User Information'}
            subHeader={'The user information below was successfully saved in the system.'}
          />
        ):(
          <></>
        )}
      </Fragment>
    );
  }
}

BaseAckPagePanel.contextType = StoreContext;
export default observer(BaseAckPagePanel);