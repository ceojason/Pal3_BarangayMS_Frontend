import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import DocumentRequestStepper from '../../components/DocumentRequestStepper/DocumentRequestStepper';

const DocumentRequestCTR = () => {
  return (
    <MainContainer>
      <div className="DocumentRequestCTR">
        <DocumentRequestStepper
          icon={<i class="bi bi-printer-fill"></i>}
          header={'Request a Document'}
          subHeader={'Please make sure all the details are correct before proceeding with the document request.'}
        />
      </div>
    </MainContainer>
  );
};

export default DocumentRequestCTR;
