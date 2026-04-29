import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import SystemConfigPanel from '../../components/SystemConfigPanel/SystemConfigPanel';

const SystemConfigCTR = () => {
  return (
    <MainContainer>
      <div className="SystemConfigCTR">
        <SystemConfigPanel />
      </div>
    </MainContainer>
  );
};

export default SystemConfigCTR;
