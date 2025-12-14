import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';

class DashboardCard extends Component {
  constructor(props) {
    super(props);
  }

  cardContent = () => {
    const { 
      header,
      cardTitle,
      cardText,
      hasButton
    } = this.props;

    return (
      <div class="card">
        <div class="card-header">
          {header}
        </div>
        <div class="card-body">
          <h5 class="card-title">{cardTitle}</h5>
          <p class="card-text">{cardText}</p>
          {hasButton && <a href="#" class="btn btn-primary">Go somewhere</a>}
        </div>
      </div>
    );
  };

  render() {
    return this.cardContent();
  };
};

DashboardCard.contextType = StoreContext;

export default observer(DashboardCard);
