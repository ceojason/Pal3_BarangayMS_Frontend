import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseButton from '../BaseButton/BaseButton';

class BaseHyperlink extends Component {
  constructor(props) {
    super(props);
  }

  onClickLink = () => {
    const { onClick } = this.props;
    onClick&&onClick();
  };

  render() {
    const { value } = this.props;

    return (
      <div className='clickablelink'>
        <BaseButton
          onClick={this.onClickLink}
          label={value}
        />
      </div>
    );
  };
};

BaseHyperlink.contextType = StoreContext;

export default observer(BaseHyperlink);