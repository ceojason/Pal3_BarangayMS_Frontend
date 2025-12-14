import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseButton from '../BaseButton/BaseButton';

class BaseTemplate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { 
      onClickNext,
      onReset,
      onClickBack 
    } = this.props;


    return (
      <div className='base_template_ctr'>
        {this.props.children}

        <div className='enrollmentStep_btns'>
          {onClickBack!=null && (
            <BaseButton
              customClassName={'onClick_reset'}
              onClick={onClickBack}
              label={'Back'}
            />
          )}
          {onReset!=null && (
            <BaseButton
              customClassName={'onClick_reset'}
              onClick={onReset}
              label={'Clear'}
            />
          )}
          {onClickNext!=null && (
            <BaseButton
              customClassName={'onClick_next'}
              onClick={onClickNext}
              label={'Next'}
            />
          )}
        </div>
      </div>
    );
  }
};

BaseTemplate.contextType = StoreContext;

export default observer(BaseTemplate);
