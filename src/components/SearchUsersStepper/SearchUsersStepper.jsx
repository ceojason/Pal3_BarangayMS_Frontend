import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';

class SearchUsersStepper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      </div>
    );
  }
};

SearchUsersStepper.contextType = StoreContext;

export default observer(SearchUsersStepper);
