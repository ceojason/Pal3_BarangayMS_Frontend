import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';

class MainStepper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, activeKey, isInquiry } = this.props;
    const activeIndex = data.findIndex(step => step.key === activeKey);
    const activeStep = data[activeIndex];

    return (
      <div className="main-stepper-wrapper">
        {!isInquiry && (
          <div className="stepper-bar mb-4">
            {data.map((step, index) => {
              const isActive = index === activeIndex;
              const isCompleted = index < activeIndex;

              return (
                <div key={step.key} className="stepper-step">
                  <div className={`step-circle ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                    {index + 1}
                  </div>
                  <div className="step-label">{step.stepperLabel || `Step ${index + 1}`}</div>
                </div>
              );
            })}
          </div>
        )}

        <div className="step-content">
          {activeStep ? (
            activeStep.content
          ) : (
            <span>Invalid Page: Key {activeKey} was not found.</span>
          )}
        </div>
      </div>
    );
  }
}

MainStepper.contextType = StoreContext;

export default observer(MainStepper);