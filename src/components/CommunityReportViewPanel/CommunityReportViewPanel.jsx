import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseTemplate from '../base/BaseTemplate/BaseTemplate';
import StepperContants from '../../../contants/StepperContants';
import ViewPortlet, { ViewField } from '../base/ViewPortlet/ViewPortlet';
import BasePanel from '../base/BasePanel/BasePanel';
import { Col, Row } from 'react-bootstrap';
import SelectField from '../base/SelectField/SelectField';
import BaseTextArea from '../../components/base/BaseTextArea/BaseTextArea';
import BaseButton from '../base/BaseButton/BaseButton';
import StatusColumn from '../StatusColumn/StatusColumn';

class CommunityReportViewPanel extends Component {
  constructor(props) {
    super(props);
    this.state={
      brgyOfficialList: [],
      statusList: [],
      showUpdateButton: false,
      reportClosed: false,
      assigneeNm: null,
      remarks: null,
      status: null,
      statusString: null
    }
  }

  componentDidMount() {
    const { isAdmin, data } = this.props;
    const { CommunityReportStore } = this.context.store;

    let statusToShowUpdate = [8, 11];

    if (isAdmin && data!=null && data.status!=null && statusToShowUpdate.includes(data.status)) {
      this.setState({ showUpdateButton: true });
    }else{
      this.setState({ showUpdateButton: false });
    }

    if (data!=null && data.status!=null && data.status==12) {
      this.setState({
        reportClosed: true,
        remarks: data.remarks,
        status: data.status,
        statusString: data.statusString,
        assigneeNm: this.state.assigneeNm!=null ? this.state.assigneeNm : data.assigneeNmAndPosition
      });
    }

    isAdmin && this.getOfficialList();
    isAdmin && this.getStatusList();
  };

  getStatusList = () => {
    const { CommunityReportStore } = this.context.store;
    CommunityReportStore.getStatusListForCommReport().then((list) => {
      this.setState({ statusList: list.statusListForCommReport });
    });

  };

  getOfficialList = async () => {
    const { CommunityReportStore } = this.context.store;

    const res = await CommunityReportStore.getBrgyOfficialList();
    this.setState({ brgyOfficialList: res });

    const { data } = this.props;
    CommunityReportStore.enrollmentRequest.assigneeId = data.assigneeId;
    CommunityReportStore.enrollmentRequest.remarks = data.remarks;
    CommunityReportStore.enrollmentRequest.status = data.status;
  };

  getViewPanel = () => {
    const { data, isView, isAck, isAdmin, isResident } = this.props;
    const { CommunityReportStore, SettingsStore } = this.context.store;
    const { showUpdateButton, brgyOfficialList, statusList, reportClosed, assigneeNm, status, statusString, remarks } = this.state;

    return (
      <Fragment>
        <ViewPortlet {...this.props}>
          {SettingsStore.showSuccessPanel && isAdmin && (
            <div className='my_profile_changes_saved_banner'>
              <span><i class="bi bi-check-circle-fill"></i>{SettingsStore.successMsg.ackMessage}</span>
            </div>
          )}
          {SettingsStore.showErrorPanel && isAdmin && (
            <div className='my_profile_changes_error_banner'>
              <span><i class="bi bi-exclamation-circle-fill"></i>{SettingsStore.errorList[0]}</span>
            </div>
          )}
          <BasePanel
            header={'Report Information'}
            icon={<i class="bi bi-folder2-open"></i>}>
              <Row>
                <Col md={6}>
                  <ViewField
                    label={'Report Type'}
                    value={data.reportTypeKeyString}
                  />
                </Col>
                {!isAdmin ? (
                  <Col md={6}>
                    <ViewField
                      label={'Happens in your household or near household?'}
                      value={data.happensNearOrInHouseholdString}
                    />
                  </Col>
                ) : (
                  <Col md={6}>
                    <ViewField
                      label={'Location'}
                      value={data.location}
                    />
                  </Col>
                )}
              </Row>

              <Row>
                {data.reportTypeKey!=null &&
                 data.reportTypeKey==99 && (
                  <Col md={6}>
                    <ViewField
                      label={'Custom Report Header'}
                      value={data.othTitle}
                    />
                  </Col>
                )}
                {!isAdmin && (
                  <Col md={6}>
                    <ViewField
                      label={'Location'}
                      value={data.location}
                    />
                  </Col>
                )}
              </Row>

              <Row>
                <Col md={12}>
                  <ViewField
                    label={'Description'}
                    value={data.description}
                  />
                </Col>
              </Row>

              {data.attachmentUrls && data.attachmentUrls.length > 0 && (
                <Row>
                  <Col md={12}>
                    <div style={{ marginTop: 15 }}>
                      <label style={{ fontWeight: 600 }}>Uploaded Images/Videos</label>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 10,
                          marginTop: 10
                        }}
                      >
                        {data.attachmentUrls.map((url, index) => (
                          <div key={index}>
                            {this.renderAttachment(url)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
          </BasePanel>

          {isAdmin && showUpdateButton && (
            <BasePanel
              icon={<i class="bi bi-stickies"></i>}
              header={'Update Report'}>
                <Row>
                  <Col md={6}>
                    <SelectField
                      label={'Assignee'}
                      isRequired={true}
                      options={brgyOfficialList}
                      value={CommunityReportStore.enrollmentRequest.assigneeId}
                      onChange={e => this.onChangeSelect('assigneeId', e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <SelectField
                      label={'Report Status'}
                      isRequired={true}
                      options={statusList}
                      value={CommunityReportStore.enrollmentRequest.status}
                      onChange={e => this.onChangeSelect('status', e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <BaseTextArea
                      label={'Remarks'}
                      rows={3}
                      onChange={e => this.onChangeInputs('remarks', e.target.value)}
                      value={CommunityReportStore.enrollmentRequest.remarks}
                      // isRequired={true}
                    />
                  </Col>
                </Row>
            </BasePanel>
          )}

          {((isResident && data.status==12) || isAdmin && reportClosed) && (
            <BasePanel
              icon={<i class="bi bi-stickies"></i>}
              header={'Update Report'}>
                <Row>
                  <Col md={6}>
                    <ViewField
                      label={'Assignee'}
                      value={assigneeNm}
                    />
                  </Col>
                  <Col md={6}>
                    <ViewField
                      label={'Status'}
                      value={<StatusColumn statusKey={status} />}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <ViewField
                      label={'Remarks'}
                      value={remarks}
                      customClassName={'white_line'}
                    />
                  </Col>
                </Row>
            </BasePanel>
          )}
        </ViewPortlet>
      </Fragment>
    );
  };

  onChangeInputs = (fieldId, val) => {
    const { CommunityReportStore } = this.context.store;

    if (val!=null) {
      CommunityReportStore.enrollmentRequest[fieldId]=val;
    }else{
      CommunityReportStore.enrollmentRequest[fieldId]=null;
    }

    if (fieldId=='remarks') {
      this.setState({
        remarks: val
      });
    }
  };

  onChangeSelect = (fieldId, val) => {
    const { CommunityReportStore } = this.context.store;

    if (val!=null && val.key!=null) {
      CommunityReportStore.enrollmentRequest[fieldId]=val.key;
    }else{
      CommunityReportStore.enrollmentRequest[fieldId]=null;
    }

    if (fieldId=='assigneeId') {
      this.setState({
        assigneeNm: val.value
      });
    }
    else if (fieldId=='status') {
      this.setState({
        status: val.key, statusString: val.value
      });
    }
  }

  renderAttachment = (url) => {
    const BASE_URL = "http://localhost:8080";
    const fullUrl = `${BASE_URL}${url}`;

    const isImage =
      url.endsWith(".jpg") ||
      url.endsWith(".jpeg") ||
      url.endsWith(".png") ||
      url.endsWith(".gif");

    const isVideo =
      url.endsWith(".mp4") ||
      url.endsWith(".webm") ||
      url.endsWith(".ogg");

    if (isImage) {
      return (
        <img
          src={fullUrl}
          alt="attachment"
          style={{
            width: "100%",
            maxWidth: 250,
            borderRadius: 8,
            objectFit: "cover",
            marginBottom: 10
          }}
        />
      );
    }

    if (isVideo) {
      return (
        <video
          src={fullUrl}
          controls
          style={{
            width: "100%",
            maxWidth: 300,
            borderRadius: 8,
            marginBottom: 10
          }}
        />
      );
    }

    return (
      <a href={fullUrl} target="_blank" rel="noreferrer">
        View File
      </a>
    );
  };

  submitRequest = () => {
    const { CommunityReportStore, SettingsStore } = this.context.store;
    const req = CommunityReportStore.validatedData;
    const formData = new FormData();

    formData.append("reportTypeKey", req.reportTypeKey);
    formData.append(
      "happensNearOrInHousehold",
      req.happensNearOrInHousehold
    );

    formData.append("location", req.location || "");
    formData.append("description", req.description || "");
    formData.append("othTitle", req.othTitle || "");
    formData.append("priorityKey", req.priorityKey || "");

    // IMPORTANT:
    // send temp uploaded file URLs only
    (req.attachmentUrls || []).forEach(url => {
      formData.append("attachmentUrls", url);
    });

    CommunityReportStore.saveRequest(
      formData,
      res => {
        CommunityReportStore.validatedData = null;
        CommunityReportStore.ackHeader.ackMessage = res.ackMessage;
        CommunityReportStore.ackHeader.refNo = res.refNo;
        CommunityReportStore.savedData = res;
        CommunityReportStore.currentStep = StepperContants.MANUAL_ENROLL__ACK;
        SettingsStore.showSuccessPanel = true;
      },
      err => {
        SettingsStore.showModal({
          type: 'error',
          errorList: err
        });
      }
    );
  };

  updateRequest = () => {
    const { CommunityReportStore } = this.context.store;
    const { data, isAdmin } = this.props;

    if (data!=null && isAdmin) {
      this.updateProcess();
    }
  };

  updateProcess = () => {
    const { SettingsStore, CommunityReportStore } = this.context.store;
    const { data } = this.props;

    CommunityReportStore.enrollmentRequest = {
      ...data,
      remarks: CommunityReportStore.enrollmentRequest.remarks,
      assigneeId: CommunityReportStore.enrollmentRequest.assigneeId,
      status: CommunityReportStore.enrollmentRequest.status
    };

    SettingsStore.showModal({
      type: 'update',
      headerTitle: 'Update Community Report',
      valueToDisplay: data && data.reporter,
      data: CommunityReportStore.enrollmentRequest,
      additionalBtn: (data, closeModal) => (
        <BaseButton
          customClassName="btn_update"
          label="Save"
          onClick={() => this.onClickUpdate(data, closeModal)}
        />
      )
    });
  };
  
  onClickUpdate = (data, closeModal) => {
    const { SettingsStore, CommunityReportStore } = this.context.store;

    window.scrollTo(0, 0);
    CommunityReportStore.validateAndUpdate(CommunityReportStore.enrollmentRequest, res => {
      SettingsStore.showSuccessPanel = true;
      if (data.status!=null && data.status==12) {
        this.setState({ showUpdateButton: false, reportClosed: true });
      }
      SettingsStore.successMsg = {
        ackMessage: res.ackMessage
      };
      setTimeout(() => {
        SettingsStore.showSuccessPanel = false;
        SettingsStore.successMsg = {};
      }, 10000);
    }, error => {
      SettingsStore.showErrorPanel = true;
      SettingsStore.errorList = error;
      setTimeout(() => {
        SettingsStore.showErrorPanel = false;
        SettingsStore.errorList = [];
      }, 10000);
    });
    closeModal && closeModal();
  };

  render() {
    const { isConfirm, onClickBack, isAck, isAdmin } = this.props;
    const { showUpdateButton } = this.state;

    return (
      <BaseTemplate
        isAck={isAck}
        onClickNext={isConfirm ? () => this.submitRequest() : null}
        onClickUpdate={isAdmin && showUpdateButton ? () => this.updateRequest() : null}
        onClickBack={onClickBack}
        {...this.props}>
          {this.getViewPanel()}
      </BaseTemplate>
    );
  }
};

CommunityReportViewPanel.contextType = StoreContext;

export default observer(CommunityReportViewPanel);
