import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import { buildClassNames } from '../../utils/ClassUtils';

class DashboardCard extends Component {
  constructor(props) {
    super(props);
  }

  cardContent = () => {
    const { 
      header,
      cardTitle,
      cardText,
      hasButton,
      icon,
      className
    } = this.props;

    return (
      <div class="card">
        <div className={buildClassNames('card-header', className)}>
          {icon}
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
