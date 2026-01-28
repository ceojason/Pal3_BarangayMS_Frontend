import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import UserRequestPanel from '../../components/UserRequestPanel/UserRequestPanel';

const PendingUserRequestCTR = () => {
  return (
    <MainContainer>
      <div className="PendingUserRequestCTR">
        <UserRequestPanel 
          isPending={true} 
          header={'Pending User Request'}
          subHeader={'View and process pending requests from residents through this module.'}
        />
      </div>
    </MainContainer>
  );
};

export default PendingUserRequestCTR;
