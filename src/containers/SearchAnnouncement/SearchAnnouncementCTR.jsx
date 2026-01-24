import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import SearchAnnouncementPanel from '../../components/SearchAnnouncementPanel/SearchAnnouncementPanel';

const SearchAnnouncementCTR = () => {
  return (
    <MainContainer
      isInquiry={true}>
      <div className="SearchAnnouncementCTR">
        <SearchAnnouncementPanel />
      </div>
    </MainContainer>
  );
};

export default SearchAnnouncementCTR;
