import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import MyProfilePanel from '../../components/MyProfilePanel/MyProfilePanel';

const MyProfileCTR = () => {
  return (
    <MainContainer>
      <div className="MyProfileCTR">
        <MyProfilePanel />
      </div>
    </MainContainer>
  );
};

export default MyProfileCTR;
