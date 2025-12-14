import React from 'react';
import StudentInquiryStepper from '../../components/StudentInquiryStepper/StudentInquiryStepper';
import MainContainer from '../../components/base/MainContainer/MainContainer';

const SearchStudentCTR = () => {
  return (
    <div className="SearchStudentCTR">
      <MainContainer
        isInquiry={true}
        header={'Student Inquiry Page'}
        subHeader={"Search, generate report, and update student/s information here."}>
        <StudentInquiryStepper />
      </MainContainer>
    </div>
  );
};

export default SearchStudentCTR;
