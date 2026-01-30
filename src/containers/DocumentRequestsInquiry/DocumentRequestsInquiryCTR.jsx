import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import UserRequestStepper from '../../components/UserRequestStepper/UserRequestStepper';

const DocumentRequestsInquiryCTR = () => {
  return (
    <MainContainer>
      <div className="DocumentRequestsInquiryCTR">
        <UserRequestStepper
          isPending={true} 
          header={'Document Requests'}
          subHeader={'View and process pending requests from residents through this module.'}
        />
      </div>
    </MainContainer>
  );
};

export default DocumentRequestsInquiryCTR;
