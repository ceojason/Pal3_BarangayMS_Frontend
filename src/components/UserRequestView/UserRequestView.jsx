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

class UserRequestView extends Component {
  constructor(props) {
    super(props);
    this.state={
      hideHeader: false,
      hasClickedGenerate: false,

      isProcessed: false,

      showProcessBtn: false,
      showRejectBtn: false
    }
    this.previewRef = React.createRef(); 
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      isProcessed: false,

      showRejectBtn: data.status!=null && data.status===8,
      showProcessBtn: data.status!=null && data.status===8,
      showGenerateBtn: data.status!=null && data.status===9,
    });
  };

  getViewPanel = () => {
    const { data } = this.props;

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
                  label={'Document Type'}
                  value={data.documentTypeString}
                />
              </Col>
            </Row>
          </BasePanel>

          <div className='main_panel_ctr admin_preview'>
            <span className='header'><i className="bi bi-envelope-paper-fill"></i>{'Sample Preview'}</span>
          </div>
          <div ref={this.previewRef}>
            <DocumentPreviewPanel
              hideHeader={true}
              data={data}
            />
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

    this.setState({ hideHeader: true, hasClickedGenerate: true }, () => {
      html2canvas(element, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(data.fileNm + '.pdf');
      });
    }, () => {
      this.setState({ hideHeader: false });
    })
  };

  onClickProcess = data => {
    const { UserRequestStore } = this.context.store;
    data.status = 9;
    UserRequestStore.processDocumentRequest(data, res => {
      this.setState({
        isProcessed: true,
        showProcessBtn: false,
        showGenerateBtn: true,
        showRejectBtn: false
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
