import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import ResetUserPanel from '../../components/ResetUserPanel/ResetUserPanel';

const ResetUserCTR = () => {
  return (
    <MainContainer>
      <div className="ResetUserCTR">
        <ResetUserPanel />
      </div>
    </MainContainer>
  );
};

export default ResetUserCTR;
