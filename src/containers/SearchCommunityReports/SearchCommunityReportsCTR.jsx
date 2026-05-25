import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import SearchCommReportStepper from '../../components/SearchCommReportStepper/SearchCommReportStepper';

const SearchCommunityReportsCTR = () => {
  return (
    <MainContainer>
      <div className="SearchCommunityReportsCTR">
        <SearchCommReportStepper
          header={'Community Reports'}
          subHeader={'View and update the community reports filed by the residents through this module.'}
        />
      </div>
    </MainContainer>
  );
};

export default SearchCommunityReportsCTR;
