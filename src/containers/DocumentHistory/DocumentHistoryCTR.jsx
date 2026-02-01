import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import UserRequestStepper from '../../components/UserRequestStepper/UserRequestStepper';

const DocumentHistoryCTR = () => {
  return (
    <MainContainer>
      <div className="DocumentHistoryCTR">
        <UserRequestStepper
          isUser={true} 
          header={'Document Request History'}
          subHeader={'View your request history through this module.'}
        />
      </div>
    </MainContainer>
  );
};

export default DocumentHistoryCTR;
