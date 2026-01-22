import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import NotificationLogsPanel from '../../components/NotificationLogsPanel/NotificationLogsPanel';

const NotificationLogsCTR = () => {
  return (
    <MainContainer
      isInquiry={true}>
      <div className="NotificationLogsCTR">
        <NotificationLogsPanel />
      </div>
    </MainContainer>
  );
};

export default NotificationLogsCTR;
