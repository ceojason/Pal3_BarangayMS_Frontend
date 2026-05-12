import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseTemplate from '../base/BaseTemplate/BaseTemplate';
import ViewPortlet, { ViewField } from '../base/ViewPortlet/ViewPortlet';
import BasePanel from '../base/BasePanel/BasePanel';
import { Col, Row } from 'react-bootstrap';
import StepperContants from '../../../contants/StepperContants';
import paliparan_icon from '../../assets/images/paliparan_icon.jpg';
import DocumentPreviewPanel from '../DocumentPreviewPanel/DocumentPreviewPanel';
import ProcessFeeCard from '../ProcessFeeCard/ProcessFeeCard';
import IdCardPreviewPanel from '../IdCardPreviewPanel/IdCardPreviewPanel';
import StatusColumn from '../StatusColumn/StatusColumn';

class DocumentRequestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // previewHtml: null
    };
  }

  componentDidMount() {
    const { DocumentStore, SettingsStore } = this.context.store;
    const { data } = this.props;

    // if (data!=null && data.id!=null) {
    //   DocumentStore.previewRequest(data, res => {
    //     this.setState({ previewHtml: res });
    //   });
    // }
  };

  getViewPanel = () => {
    const { data, isView, isAck } = this.props;

    return (
      <Fragment>
        <ViewPortlet {...this.props}>
          <BasePanel header={'Document Information'} icon={<i class="bi bi-envelope-paper-fill"></i>}>
            <Row>
              <Col md={6}>
                <ViewField
                  label={'Document Category'}
                  value={data.docuCategoryKeyString}
                />
              </Col>
              <Col md={6}>
                <ViewField
                  label={'Document Type'}
                  value={data.docuSubCategoryKeyString}
                />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <ViewField
                  label={'Purpose'}
                  value={data.purposeKey!=null && data.purposeKey!=5 ? data.purposeKeyString : data.othPurpose}
                />
              </Col>
              <Col md={6}>
                <ViewField
                  label={'Status'}
                  value={<StatusColumn
                    statusKey={data.status}
                  />}
                />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <ProcessFeeCard data={data.processFee} />
              </Col>
            </Row>
          </BasePanel>

          {(data.purposeKey!=null ||
            data.purpose!=null) && 
            data.docuSubCategoryKey!=26 &&
            (
            <DocumentPreviewPanel 
              docSubCategoryString={
                data.docuSubCategoryKeyString
              } 
              docCategoryString={
                data.docuCategoryKeyString
              }
              fullName={data.fullName}
              address={data.homeAddress}
              purpose={
                (data.purposeKey != null &&
                data.purposeKey != 5)
                  ? data.purposeKeyString
                  : data.othPurpose
              }
            />
          )}

          {(data.purposeKey!=null ||
            data.purpose!=null) && 
            data.docuSubCategoryKey==26 &&
            (
            <IdCardPreviewPanel 
              fullName={data.fullName}
              address={data.homeAddress}
              birthDate={data.birthDtString}
              sex={data.genderString}
              civilStatus={data.civilStatusString}
              contactNo={data.mobileNo}
            />
          )}
        </ViewPortlet>
      </Fragment>
    );
  };

  submitRequest = () => {
    const { DocumentStore, SettingsStore } = this.context.store;
    DocumentStore.saveRequest(DocumentStore.validatedData, res => {
      DocumentStore.validatedData=null;
      DocumentStore.ackHeader.ackMessage=res.ackMessage;
      DocumentStore.ackHeader.refNo=res.refNo;
      DocumentStore.savedData=res;
      DocumentStore.currentStep=StepperContants.MANUAL_ENROLL__ACK;
      SettingsStore.showSuccessPanel=true;
    }, err => {
      SettingsStore.showModal({ type: 'error', errorList: err });
    });
  };

  render() {
    const { isConfirm, onClickBack, isAck } = this.props;

    return (
      <BaseTemplate
        isAck={isAck}
        onClickNext={isConfirm ? () => this.submitRequest() : null}
        onClickBack={onClickBack}
        {...this.props}>
          {this.getViewPanel()}
      </BaseTemplate>
    );
  }
};

DocumentRequestView.contextType = StoreContext;

export default observer(DocumentRequestView);
