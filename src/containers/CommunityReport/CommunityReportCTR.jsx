import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import CommunityReportStepper from '../../components/CommunityReportStepper/CommunityReportStepper';

const CommunityReportCTR = () => {
  return (
    <MainContainer>
      <div className="CommunityReportCTR">
        <CommunityReportStepper 
          header={'File a Community Report'}
          subHeader={'Please make sure all the details are correct before proceeding with the filing of community report.'}
        />
      </div>
    </MainContainer>
  );
};

export default CommunityReportCTR;
