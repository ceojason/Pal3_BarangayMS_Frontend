import React from 'react';
import AddAdminCTR from './AddAdminCTR';
import MainContainer from '../../components/base/MainContainer/MainContainer';

const AddAdminMainCTR = () => {
  return (
    <MainContainer
      header={'System Administrator Enrollment Page'}
      subHeader={"Add system administrator/s through manual process."}>
        <div className="AddAdminMainCTR">
          <AddAdminCTR />
        </div>
    </MainContainer>
  );
};

export default AddAdminMainCTR;
