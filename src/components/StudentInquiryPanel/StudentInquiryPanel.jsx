import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import InquiryPanel from '../../components/base/InquiryPanel/InquiryPanel';
import InquiryTable from '../../components/base/InquiryTable/InquiryTable';
import SearchFilterUtils from '../../utils/SearchFilterUtils';
import BaseHyperlink from '../base/BaseHyperlink/BaseHyperlink';
import StepperContants from '../../../contants/StepperContants';
import BaseModal from '../base/BaseModal/BaseModal';
import BaseButton from '../base/BaseButton/BaseButton';

class StudentInquiryPanel extends Component {
  onSearch = (multiSort) => {
    const { StudentEnrollmentStore, SettingsStore } = this.context.store;
    let pagination = { page: 0, size: 10 };

    if (!multiSort) {
      multiSort = {
        sortBy: 'first_nm',
        direction: 'ASC'
      };
    }

    let searchFilter = SearchFilterUtils.getSearchFilterObject(StudentEnrollmentStore.searchFields);
    const requestObj = {
      ...searchFilter,
      ...multiSort,
      ...pagination
    };

    StudentEnrollmentStore.searchStudents(requestObj)
      .then(data => {
        StudentEnrollmentStore.inquiryData = data;
        SettingsStore.isInitialSearch = false;
      });
  };

  onReset = () => {
    const { StudentEnrollmentStore } = this.context.store;
    StudentEnrollmentStore.resetInquiry(true);
  };

  onClickLink = data => {
    const { StudentEnrollmentStore, SettingsStore } = this.context.store;

    StudentEnrollmentStore.inquiryData = [];
    SettingsStore.isInitialSearch = true;

    StudentEnrollmentStore.findStudentByLrn(data.lrn).then((obj) => {
      StudentEnrollmentStore.viewData = { ...data, ...obj };
      StudentEnrollmentStore.searchStep = StepperContants.INQUIRY_VIEW;
    }).catch(error => {
      console.error("Error fetching student by LRN:", error);
    });
  };

  onClickUpdate = data => {
    // Handle update modal here if needed
  };

  onClickDelete = (data, closeModal) => {
    const { StudentEnrollmentStore, SettingsStore } = this.context.store;

    StudentEnrollmentStore.deleteStudent(data && data.lrn, res => {
      StudentEnrollmentStore.ackHeader.ackMessage = res.ackMessage;
      StudentEnrollmentStore.ackHeader.refNo = res.refNo;
      StudentEnrollmentStore.inquiryData = [];

      closeModal?.();
      
      SettingsStore.hideCustomModal();
      SettingsStore.showSuccessMsg(StudentEnrollmentStore.ackHeader);
    }, err => {
        SettingsStore.showModal({ type: 'error', errorList: err });
    });
  };

  showDeleteModal = (data) => {
    const { SettingsStore } = this.context.store;

    SettingsStore.showModal({
      type: 'delete',
      headerTitle: 'Delete Confirmation',
      valueToDisplay: data.studentFullNm,
      data: data,
      additionalBtn: (data, closeModal) => (
        <BaseButton
          customClassName="btn_delete"
          label="Delete"
          onClick={() => this.onClickDelete(data, closeModal)}
        />
      )
    });
  };

  getDataCols = () => {
    return [
      {
        name: 'Learner Reference Number',
        index: 'lrn',
        cell: data => (
          <BaseHyperlink value={data.lrn} onClick={() => this.onClickLink(data)} />
        )
      },
      {
        name: 'Student Name',
        index: 'studentFullNm',
        sortBy: 'firstNm'
      },
      {
        name: 'Section',
        index: 'sectionNm',
        sortBy: 'sectionNm'
      },
      {
        name: 'Enrollee Type',
        index: 'enrolleeTypeDscp'
      },
      {
        name: '',
        index: null,
        cell: data => (
          <div className="actionbtns_ctr">
            <BaseButton
              customClassName="btn_update"
              onClick={() => this.onClickUpdate(data)}
              label="Update"
              hasIcon
              icon={<i className="bi bi-pencil-square"></i>}
            />
            <BaseButton
              customClassName="btn_delete"
              onClick={() => this.showDeleteModal(data)}
              label="Delete"
              hasIcon
              icon={<i className="bi bi-trash"></i>}
            />
          </div>
        )
      }
    ];
  };

  render() {
    const { StudentEnrollmentStore, SettingsStore } = this.context.store;
    const { customModal } = SettingsStore;

    return (
      <InquiryPanel
        header={null}
        subHeader={null}
        hasSearchFilter
        filterList={StudentEnrollmentStore.searchFields}
        onSearch={() => this.onSearch()}
        onReset={() => this.onReset()}
        hasDownload={StudentEnrollmentStore.inquiryData?.length > 0}
        data={StudentEnrollmentStore.inquiryData}
        columns={this.getDataCols()}
        fileTitle="Student List Report"
        fileName="Student_List_Report.pdf">
          <InquiryTable
            data={StudentEnrollmentStore.inquiryData || []}
            columns={this.getDataCols()}
          />
      </InquiryPanel>
    );
  }
}

StudentInquiryPanel.contextType = StoreContext;

export default observer(StudentInquiryPanel);