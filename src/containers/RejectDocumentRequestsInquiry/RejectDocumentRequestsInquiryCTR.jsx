import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import UserRequestStepper from '../../components/UserRequestStepper/UserRequestStepper';

const RejectDocumentRequestsInquiryCTR = () => {
  return (
    <MainContainer>
      <div className="RejectDocumentRequestsInquiryCTR">
        <UserRequestStepper
          isPending={false} 
          header={'Rejected Document Requests'}
          subHeader={'View rejected document requests from residents through this module.'}
        />
      </div>
    </MainContainer>
  );
};

export default RejectDocumentRequestsInquiryCTR;
