import React from 'react';
import MainContainer from '../../components/base/MainContainer/MainContainer';
import SearchUsersStepper from '../../components/SearchUsersStepper/SearchUsersStepper';

const SearchUsersCTR = () => {
  return (
    <MainContainer
      isInquiry={true}
      header={'Search Users'}
      subHeader={'Search, manage, and update user data through this module.'}>
      <div className="SearchUsersCTR">
        <SearchUsersStepper />
      </div>
    </MainContainer>
  );
};

export default SearchUsersCTR;
