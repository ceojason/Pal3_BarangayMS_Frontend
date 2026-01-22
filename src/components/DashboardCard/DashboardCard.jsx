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
      className,
      data,
      label
    } = this.props;

    // if (data==null) return <></>;

    return (
      <div class="card dashboard_card">
        <div className={buildClassNames('card-header', className)}>
          {icon}
          {header}
        </div>
        <div class="card-body">
          <h5 class="card-title">{cardTitle}</h5>
          <p class="card-text">{cardText}</p>
          
          <div className='card_body_main'>
            {data!=null && (
              <span className='data'>{data}</span>
            )}
            {icon != null && (
              <span className={buildClassNames('icon')}>
                {icon}
              </span>
            )}
          </div>
          {label!=null && (
            <span className='card_body_main_label'>{label}</span>
          )}
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
