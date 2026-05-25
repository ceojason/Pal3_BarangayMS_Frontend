import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';

class HouseholdViewPanel extends Component {
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

HouseholdViewPanel.contextType = StoreContext;

export default observer(HouseholdViewPanel);
