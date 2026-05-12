import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseTemplate from '../base/BaseTemplate/BaseTemplate';
import ViewPortlet, { ViewField } from '../base/ViewPortlet/ViewPortlet';
import BasePanel from '../base/BasePanel/BasePanel';
import { Col, Row } from 'react-bootstrap';
import DocumentPreviewPanel from '../DocumentPreviewPanel/DocumentPreviewPanel';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import BaseButton from '../base/BaseButton/BaseButton';
import IdCardPreviewPanel from '../IdCardPreviewPanel/IdCardPreviewPanel';
import StatusColumn from '../StatusColumn/StatusColumn';
import ProcessFeeCard from '../ProcessFeeCard/ProcessFeeCard';

class UserRequestView extends Component {
  constructor(props) {
    super(props);
    this.state={
      hideHeader: false,
      hasClickedGenerate: false,

      isProcessed: false,
      dateProcessedString: null,

      showProcessBtn: false,
      showRejectBtn: false,

      isGeneratingPdf: false,
    }
    this.previewRef = React.createRef(); 
  }

  componentDidMount() {
    const { data, isUser } = this.props;
    this.setState({
      isProcessed: false,

      showRejectBtn: !isUser && data.status!=null && data.status===8,
      showProcessBtn: !isUser && data.status!=null && data.status===8,
      showGenerateBtn: !isUser && data.status!=null && data.status===9,
    });
  };

  getViewPanel = () => {
    const { data } = this.props;
    const { showGenerateBtn, dateProcessedString } = this.state;

    return (
      <Fragment>
        <ViewPortlet {...this.props}>
          <BasePanel header={'Request Information'} icon={<i class="bi bi-file-earmark-post"></i>}>
            <Row>
              <Col md={6}>
                <ViewField
                  label={'Document Requestor'}
                  value={data.requestor}
                  customClassName={'with_highlight'}
                  icon={<i class="bi bi-person-check-fill"></i>}
                />
              </Col>
              <Col md={6}>
                <ViewField
                  label={'Date Requested'}
                  value={data.dateRequestedString}
                />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <ViewField
                  label={'Document Category & Type'}
                  value={data.docuCategoryKeyString + ' - ' + data.docuSubCategoryKeyString}
                />
              </Col>
              <Col md={6}>
                <ViewField
                  label={'Purpose'}
                  value={data.purposeKey!=null && data.purposeKey!=5 ? data.purposeKeyString : data.othPurpose}
                />
              </Col>
            </Row>

            
            <Row>
              {showGenerateBtn ? (
                  <Col md={6}>
                    <ViewField
                      label={'Date Processed'}
                      value={data.dateProcessedString}
                    />
                  </Col>
              ) : (
                <Col md={6}>
                  <ProcessFeeCard data={data.processFee} />
                </Col>
              )}
              <Col md={6}>
                <ViewField
                  label={'Status'}
                  value={<StatusColumn
                    statusKey={data.status}
                  />}
                />
              </Col>
            </Row>

            {showGenerateBtn && (
              <Row>
                <Col md={6}>
                  <ProcessFeeCard data={data.processFee} />
                </Col>
              </Row>
            )}
          </BasePanel>
          
          <div ref={this.previewRef} className={this.state.isGeneratingPdf ? 'pdf_export_mode' : ''}>
            {(data.purposeKey!=null ||
              data.purpose!=null) && 
              data.docuSubCategoryKey!=26 &&
              (
              <DocumentPreviewPanel
                hideHeader={this.state.hideHeader}
                isGeneratingPdf={this.state.isGeneratingPdf}
                docSubCategoryString={
                  data.docuSubCategoryKeyString
                }
                docCategoryString={
                  data.docuCategoryKeyString
                }
                fullName={data.requestor}
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
                fullName={data.requestor}
                address={data.homeAddress}
                birthDate={data.birthDtString}
                sex={data.genderString}
                civilStatus={data.civilStatusString}
                contactNo={data.mobileNo}
                hideHeader={this.state.hideHeader}
              />
            )}
          </div>
        </ViewPortlet>
      </Fragment>
    );
  };

  onClickReject = () => {
    const { SettingsStore } = this.context.store;
    const { data } = this.props;
    
    SettingsStore.showModal({
      type: 'reject',
      headerTitle: 'Reject Confirmation',
      valueToDisplay: ' ' + data.documentTypeString + ' request',
      data: data,
      additionalBtn: (data, closeModal) => (
        <BaseButton
          customClassName="btn_delete"
          label="Reject"
          onClick={() => this.rejectDocument(data, closeModal)}
        />
      )
    });
  };

  rejectDocument = (data, closeModal) => {
    const { SettingsStore, UserRequestStore } = this.context.store;

    closeModal && closeModal();
    data.status = 10;
    UserRequestStore.processDocumentRequest(data, res => {
      this.setState({
        rejectedDocu: true,
        showRejectBtn: false,
        showGenerateBtn: false,
        showProcessBtn: false
      });
      setTimeout(() => this.setState({ rejectedDocu: false }), 30000);
    },
    err => {
      setTimeout(() => {
        SettingsStore.showModal({
          type: 'error',
          headerTitle: 'Transaction could not be processed.',
          errorList: err
        });
      }, 150);
    });
  };

  onClickGenerate = () => {
    const { data } = this.props;
    const element = this.previewRef.current;

    if (!element) return;

    this.setState({
      hideHeader: true,
      isGeneratingPdf: true
    }, async () => {

      // wait for DOM repaint (VERY IMPORTANT)
      await new Promise(r => setTimeout(r, 500));

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = 210;
      const pageHeight = 297;

      // FIXED FIT (no stretching distortion)
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

      heightLeft -= pageHeight;

      // handle multi-page (IMPORTANT improvement)
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(data.fileNm + '.pdf');

      this.setState({
        hideHeader: false,
        isGeneratingPdf: false
      });

    });
  };

  onClickProcess = data => {
    const { UserRequestStore } = this.context.store;
    data.status = 9;
    UserRequestStore.processDocumentRequest(data, res => {
      this.setState({
        isProcessed: true,
        showProcessBtn: false,
        showGenerateBtn: true,
        showRejectBtn: false,
        dateProcessedString: res.dateProcessedString
      });
    });
    setTimeout(() => this.setState({ isProcessed: false }), 5000);
  };

  render() {
    const { isPending, data } = this.props;
    const { showRejectBtn, showProcessBtn, showGenerateBtn, isProcessed, rejectedDocu } = this.state;

    return (
      <Fragment>
        {rejectedDocu && (
          <div className='my_profile_changes_saved_banner'>
            <span><i class="bi bi-check-circle-fill"></i>{'Document request has been rejected.'}</span>
          </div>
        )}
        {isProcessed && (
          <div className='my_profile_changes_saved_banner'>
            <span><i class="bi bi-check-circle-fill"></i>{'Document request has been successfully processed. You can now generate the requested document.'}</span>
          </div>
        )}
        <BaseTemplate {...this.props}
          onClickReject={showRejectBtn ? () => this.onClickReject() : null}
          onClickGenerate={showGenerateBtn ? () => this.onClickGenerate() : null}
          onClickProcess={showProcessBtn ? () => this.onClickProcess(data) : null}>
            {this.getViewPanel()}
        </BaseTemplate>
      </Fragment>
    );
  }
};

UserRequestView.contextType = StoreContext;

export default observer(UserRequestView);
