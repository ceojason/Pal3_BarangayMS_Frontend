import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import AnnouncementLogsPanel from '../../components/AnnouncementLogsPanel/AnnouncementLogsPanel';

const AnnouncementLogsCTR = () => {
  return (
    <MainContainer>
      <div className="AnnouncementLogsCTR">
        <AnnouncementLogsPanel />
      </div>
    </MainContainer>
  );
};

export default AnnouncementLogsCTR;
