import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import AddAnnouncementStepper from '../../components/AddAnnouncementStepper/AddAnnouncementStepper';

const AddAnnouncementCTR = () => {
  return (
    <MainContainer>
      <div className="AddAnnouncementCTR">
        <AddAnnouncementStepper
          header={'Add Announcement'}
          subHeader={'Please make sure all the details are correct before generating and sending an announcement.'}
          icon={<i class="bi bi-megaphone-fill"></i>}
        />
      </div>
    </MainContainer>
  );
};

export default AddAnnouncementCTR;
