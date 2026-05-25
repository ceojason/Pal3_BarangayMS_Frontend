import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseTemplate from '../base/BaseTemplate/BaseTemplate';
import MainForm from '../base/MainForm/MainForm';
import BasePanel from '../base/BasePanel/BasePanel';
import SelectField from '../base/SelectField/SelectField';
import { Col, Row } from 'react-bootstrap';
import InputField from '../base/InputField/InputField';
import BaseTextArea from '../base/BaseTextArea/BaseTextArea';
import AttachmentUploadField from '../AttachmentUploadField/AttachmentUploadField';
import StepperContants from '../../../contants/StepperContants';

class CommunityReportFilePanel extends Component {
  constructor(props) {
    super(props);
    this.state={
      reportTypeList: [],
      reportPriorityList: [],
      yesNoList: [],
    };
  }

  componentDidMount() {
    const { CommunityReportStore, UsersStore } = this.context.store;

    CommunityReportStore.getReportTypeList().then((list) => {
      this.setState({ reportTypeList: list.reportTypeList });
    });

    CommunityReportStore.reportPriorityList().then((list) => {
      this.setState({ reportPriorityList: list.reportPriorityList });
    });

    UsersStore.getYesNoList().then((list) => {
      this.setState({ yesNoList: list.yesNoList });
    });
  };

  onChangeSelect = (fieldId, val) => {
    const { CommunityReportStore } = this.context.store;

    if (val!=null && val.key!=null) {
      CommunityReportStore.enrollmentRequest[fieldId]=val.key;
    }else{
      CommunityReportStore.enrollmentRequest[fieldId]=null;
    }

    if (fieldId=='reportTypeKey' && val!=null && val.key!=99) {
      CommunityReportStore.enrollmentRequest.othTitle=null;
    }

    if (fieldId=='isNearOrInHousehold' && val!=null && val.key==0) {
      CommunityReportStore.enrollmentRequest.location=null;
    }
  };

  onChangeInputs = (fieldId, val) => {
    const { CommunityReportStore } = this.context.store;

    if (val!=null&& val.trim() !== '') {
      CommunityReportStore.enrollmentRequest[fieldId]=val;
    }else{
      CommunityReportStore.enrollmentRequest[fieldId]=null;
    }
  };

  form = () => {
    const { CommunityReportStore } = this.context.store;
    const { reportTypeList, reportPriorityList, yesNoList } = this.state;

    return (
      <MainForm>
        <BasePanel
          icon={<i class="bi bi-folder2-open"></i>}
          header={'Report Information'}>
            <Row>
              <Col md={6}>
                <SelectField
                  label={'Report Type'}
                  isRequired={true}
                  options={reportTypeList}
                  value={CommunityReportStore.enrollmentRequest.reportTypeKey}
                  onChange={e => this.onChangeSelect('reportTypeKey', e.target.value)}
                />
              </Col>
              <Col md={6}>
                <SelectField
                  label={'Did this happen in or near your home?'}
                  isRequired={true}
                  options={yesNoList}
                  value={CommunityReportStore.enrollmentRequest.happensNearOrInHousehold}
                  onChange={e => this.onChangeSelect('happensNearOrInHousehold', e.target.value)}
                />
              </Col>
              
            </Row>

            <Row>
              {CommunityReportStore.enrollmentRequest.reportTypeKey!=null &&
               CommunityReportStore.enrollmentRequest.reportTypeKey==99 && (
                <Col md={6}>
                  <InputField
                    label={'Custom Report Header'}
                    maxLength={100}
                    type={'text'}
                    isRequired={true}
                    value={CommunityReportStore.enrollmentRequest.othTitle}
                    onChange={e => this.onChangeInputs('othTitle', e.target.value)}
                  />
              </Col>
              )}

              {CommunityReportStore.enrollmentRequest.happensNearOrInHousehold!=null &&
               CommunityReportStore.enrollmentRequest.happensNearOrInHousehold==1 && (
                <Col md={6}>
                  <InputField
                    label={'Location'}
                    maxLength={255}
                    type={'text'}
                    isRequired={true}
                    value={CommunityReportStore.enrollmentRequest.location}
                    onChange={e => this.onChangeInputs('location', e.target.value)}
                    inst={'Please specify/describe the exact location'}
                  />
              </Col>
              )}
            </Row>

            <BaseTextArea
              label={'Description'}
              rows={3}
              onChange={e => this.onChangeInputs('description', e.target.value)}
              value={CommunityReportStore.enrollmentRequest.description}
              isRequired={true}
            />

            <AttachmentUploadField
              label={'Upload Images/Videos'}
              onChange={(files) => this.onChangePhotoVid(files)}
              files={CommunityReportStore.enrollmentRequest.attachments || []}
            />
        </BasePanel>
      </MainForm>
    );
  };

  onChangePhotoVid = (files) => {
    const { CommunityReportStore } = this.context.store;

    CommunityReportStore.enrollmentRequest.attachments = files;
  };

  onClickNext = () => {
  const { CommunityReportStore, SettingsStore } = this.context.store;

  const req = CommunityReportStore.enrollmentRequest;

  const formData = new FormData();

  const safeAppend = (key, value) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  };

    // ✅ avoid sending "null" strings
    safeAppend("reportTypeKey", req.reportTypeKey);
    safeAppend("happensNearOrInHousehold", req.happensNearOrInHousehold);

    safeAppend("othTitle", req.othTitle);
    safeAppend("location", req.location);
    safeAppend("description", req.description);

    // ✅ attachments (unchanged, already safe)
    (req.attachments || []).forEach(item => {
      if (item?.file instanceof File) {
        formData.append(
          "attachments",
          item.file,
          item.file.name
        );
      }
    });

    CommunityReportStore.validateRequest(
      formData,
      res => {
        CommunityReportStore.validatedData = res;
        CommunityReportStore.currentStep =
          StepperContants.MANUAL_ENROLL__CONFIRM;
      },
      err => {
        SettingsStore.showModal({
          type: 'error',
          errorList: err
        });
      }
    );
  };

  onReset = () => {
    const { CommunityReportStore } = this.context.store;
    CommunityReportStore.reset();
  };

  render() {
    return (
      <BaseTemplate
        onClickNext={() => this.onClickNext()}
        onReset={() => this.onReset()}
        currentStep={1}
        totalSteps={3}
        {...this.props}>
          {this.form()}
      </BaseTemplate>
    );
  }
};

CommunityReportFilePanel.contextType = StoreContext;

export default observer(CommunityReportFilePanel);
