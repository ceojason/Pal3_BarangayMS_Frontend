import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import HouseholdStepper from '../../components/HouseholdStepper/HouseholdStepper';

const HouseholdCTR = () => {
  return (
    <MainContainer>
      <div className="HouseholdCTR">
        <HouseholdStepper />
      </div>
    </MainContainer>
  );
};

export default HouseholdCTR;
