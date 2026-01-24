import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseButton from '../BaseButton/BaseButton';
import { buildClassNames } from '../../../utils/ClassUtils';

class BaseTemplate extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  };

  render() {
    const { 
      onClickNext,
      onReset,
      onClickBack,
      currentStep,
      totalSteps,
      isAck,
      isConfirm,
      header,
      subHeader,
      icon
    } = this.props;
    let isInitial = currentStep!=null && currentStep===1;

    return (
      <div className={buildClassNames('base_template_ctr', isInitial ? 'base_initial_ctr' : '', !isAck ? 'is_ack_base_ctr' : '')}>
        <span className='header'>
          {!isAck && icon ? icon : null}
          {header}
        </span>
        <span className='sub_header'>{subHeader}</span>
        {!isAck && <div className='form_divider'></div>}
        {this.props.children}

        <div className='enrollmentStep_btns'>
          {(currentStep!=null && totalSteps!=null) && (
            <div className='steps_in_ctr'>
              Step {currentStep} of {totalSteps}
            </div>
          )}
          
          <div className='main_btns'>
            {onClickBack!=null && (
              <BaseButton
                customClassName={'onClick_reset'}
                onClick={onClickBack}
                label={isAck ? 'Done' : 'Back'}
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
                label={isConfirm ? 'Submit' : 'Next'}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
};

BaseTemplate.contextType = StoreContext;

export default observer(BaseTemplate);
