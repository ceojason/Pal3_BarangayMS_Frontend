import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';

class BasePanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { header, icon } = this.props;

    return (
      <div className='main_panel_ctr'>
        <div className='header'>
          <span className='string'>{header}</span>
        </div>
        {this.props.children}
        <div className='form_divider'></div>
      </div>
    );
  }
};

BasePanel.contextType = StoreContext;

export default observer(BasePanel);
