import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import UserRequestStepper from '../../components/UserRequestStepper/UserRequestStepper';

const ProcessedUserRequestCTR = () => {
  return (
    <MainContainer>
      <div className="ProcessedUserRequestCTR">
        <UserRequestStepper
          isPending={false} 
          header={'Processed User Request'}
          subHeader={'View processed requests from residents through this module.'}
        />
      </div>
    </MainContainer>
  );
};

export default ProcessedUserRequestCTR;
