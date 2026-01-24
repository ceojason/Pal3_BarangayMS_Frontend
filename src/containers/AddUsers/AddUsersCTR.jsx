import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import AddUsersStepper from '../../components/AddUsersStepper/AddUsersStepper';

const AddUsersCTR = () => {
  return (
    <MainContainer>
      <div className="AddUsersCTR">
        <AddUsersStepper
          icon={<i class="bi bi-people-fill"></i>}
          header={'Add User'}
          subHeader={'Please make sure all the details are correct before proceeding with the registration.'}
        />
      </div>
    </MainContainer>
  );
};

export default AddUsersCTR;
