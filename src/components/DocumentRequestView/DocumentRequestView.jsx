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
              <Col md={4}>
                <ViewField
                  label={'Document Type'}
                  value={data.documentTypeString}
                />
              </Col>
              <Col md={4}>
                <ViewField
                  label={'Date Requested'}
                  value={data.dateRequestedString}
                />
              </Col>
              <Col md={4}>
                <ViewField
                  label={'Status'}
                  value={data.statusString}
                />
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <ViewField
                  label={'Purpose'}
                  value={data.purpose}
                  isMessage={true}
                />
              </Col>
            </Row>
          </BasePanel>

          {/* {(isView || isAck) && (
            <BasePanel>
              <Row className="mt-3 file_preview">
                <Col md={12}>
                  <h5><i class="bi bi-search"></i>Document Preview</h5>
                  {this.state.previewHtml ? (
                    <div className='file_preview_body'
                      dangerouslySetInnerHTML={{ __html: this.state.previewHtml }}
                    />
                  ) : (
                    <div>Loading preview...</div>
                  )}
                </Col>
              </Row>
            </BasePanel>
          )} */}
          {(isView || isAck) && (
            <DocumentPreviewPanel 
              header={'Sample Preview'}
              data={data}
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
