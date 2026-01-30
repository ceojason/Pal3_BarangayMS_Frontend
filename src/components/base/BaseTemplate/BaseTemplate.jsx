import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseButton from '../BaseButton/BaseButton';
import { buildClassNames } from '../../../utils/ClassUtils';
import classNames from 'classnames';

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
      icon,
      onClickGenerate,
      onClickReject,
      onClickProcess
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
                customClassName={classNames('onClick_back', isAck ? 'isAck_back' : '')}
                onClick={onClickBack}
                label={isAck ? 'Done' : 'Back'}
                hasIcon={true}
                icon={!isAck ? <i class="bi bi-arrow-left-circle-fill"></i> : <i class="bi bi-check-circle-fill"></i>}
              />
            )}
            {onReset!=null && (
              <BaseButton
                customClassName={'onClick_reset'}
                onClick={onReset}
                label={'Clear'}
                hasIcon={true}
                icon={<i class="bi bi-arrow-counterclockwise"></i>}
              />
            )}
            {onClickNext!=null && (
              <BaseButton
                customClassName={'onClick_next'}
                onClick={onClickNext}
                label={isConfirm ? 'Save' : 'Next'}
                hasIcon={true}
                icon={isConfirm ? <i class="bi bi-floppy-fill"></i> : <i class="bi bi-arrow-right-circle-fill"></i>}
              />
            )}
            {onClickReject!=null && (
              <BaseButton
                customClassName={'onClick_reject'}
                onClick={onClickReject}
                label={'Reject'}
                hasIcon={true}
                icon={<i class="bi bi-x-circle-fill"></i>}
              />
            )}
            {onClickGenerate!=null && (
              <BaseButton
                customClassName={'onClick_generate'}
                onClick={onClickGenerate}
                label={'Generate'}
                hasIcon={true}
                icon={<i class="bi bi-download"></i>}
              />
            )}
            {onClickProcess!=null && (
              <BaseButton
                customClassName={'onClick_generate'}
                onClick={onClickProcess}
                label={'Process'}
                hasIcon={true}
                icon={<i class="bi bi-file-earmark-check-fill"></i>}
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
