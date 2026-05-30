import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseTemplate from '../base/BaseTemplate/BaseTemplate';
import MainForm from '../base/MainForm/MainForm';
import BasePanel from '../base/BasePanel/BasePanel';
import { Col, Row } from 'react-bootstrap';
import SelectField from '../base/SelectField/SelectField';
import BaseTextArea from '../base/BaseTextArea/BaseTextArea';
import StepperContants from '../../../contants/StepperContants';
import ProcessFeeCard from '../ProcessFeeCard/ProcessFeeCard';
import DocumentPreviewPanel from '../DocumentPreviewPanel/DocumentPreviewPanel';
import IdCardPreviewPanel from '../IdCardPreviewPanel/IdCardPreviewPanel';

class DocumentRequestPanel extends Component {
  constructor(props) {
    super(props);
    this.state={
      documentTypeList: [],

      purposeKeyList: [],
      docuCategoryList: [],
      docuSubCategoryList: []
    };
  }

  componentDidMount() {
    const { DocumentStore, SessionStore } = this.context.store;
    DocumentStore.enrollmentRequest.fullName = SessionStore.currentUser.userFullNm;
    DocumentStore.enrollmentRequest.homeAddress = SessionStore.currentUser.homeAddress;
    DocumentStore.enrollmentRequest.birthDtString = SessionStore.currentUser.birthDtString;
    DocumentStore.enrollmentRequest.genderString = SessionStore.currentUser.genderString;
    DocumentStore.enrollmentRequest.civilStatusString = SessionStore.currentUser.civilStatusString;
    DocumentStore.enrollmentRequest.mobileNo = SessionStore.currentUser.mobileNo;

    // DocumentStore.getDocumentTypeList().then((list) => {
    //   this.setState({ documentTypeList: list.documentTypeList });
    // });

    if (DocumentStore.enrollmentRequest.docuCategoryKey!=null) {
      this.getDocuSubCategoryList(DocumentStore.enrollmentRequest.docuCategoryKey);
    }

    DocumentStore.getPurposeKeyList().then((list) => {
      this.setState({ purposeKeyList: list.purposeKeyList });
    });

    DocumentStore.getDocuCategoryList().then((list) => {
      this.setState({ docuCategoryList: list.docuCategoryList });
    });
    
  };

  onChangeSelect = (fieldId, val) => {
    const { DocumentStore } = this.context.store;

    if (val!=null && val.key!=null) {
      DocumentStore.enrollmentRequest[fieldId]=val.key;
    }else{
      DocumentStore.enrollmentRequest[fieldId]=null;
    }

    if (fieldId=='docuCategoryKey' && val!=null) {
      DocumentStore.enrollmentRequest.docuCategoryKeyString = val.value;
      DocumentStore.enrollmentRequest.docuSubCategoryKey = null;
      this.getDocuSubCategoryList(val.key);
    }

    if (fieldId=='docuSubCategoryKey' && val!=null) {
      DocumentStore.enrollmentRequest.docuSubCategoryKeyString = val.value;
      this.getProcessFee(val.key);
    }

    if (fieldId=='purposeKey' && val!=null) {
      DocumentStore.enrollmentRequest.purposeKeyString = val.value;
      if (val.key!=null && val.key!=5) {
        DocumentStore.enrollmentRequest.othPurpose = null;
      }
    }
  };

  getProcessFee = key => {
    const { DocumentStore } = this.context.store;

    DocumentStore.getProcessFeeByKey(key).then((fee) => {
      DocumentStore.enrollmentRequest.processFee = fee.processFee;
      DocumentStore.enrollmentRequest.processFeeString = fee.processFeeString;
    });
  };

  getDocuSubCategoryList = key => {
    const { DocumentStore } = this.context.store;
    DocumentStore.getDocuSubCatListByKey(key).then((list) => {
      this.setState({ docuSubCategoryList: list.docuSubCategoryList });
    });
  };

  onChangeInputs = (fieldId, val) => {
    const { DocumentStore } = this.context.store;

    if (val!=null&& val.trim() !== '') {
      DocumentStore.enrollmentRequest[fieldId]=val;
    }else{
      DocumentStore.enrollmentRequest[fieldId]=null;
    }
  };

  form = () => {
    const { DocumentStore } = this.context.store;
    const { documentTypeList, 
      purposeKeyList, 
      docuCategoryList,
      docuSubCategoryList
     } = this.state;

    return (
      <MainForm>
        <BasePanel
          icon={<i class="bi bi-file-earmark-pdf"></i>}
          header={'Document Information'}>
            <Row>
              <Col md={6}>
                <SelectField
                  label={'Document Category'}
                  isRequired={true}
                  options={docuCategoryList}
                  value={DocumentStore.enrollmentRequest.docuCategoryKey}
                  onChange={e => this.onChangeSelect('docuCategoryKey', e.target.value)}
                />
              </Col>
              {DocumentStore.enrollmentRequest.docuCategoryKey!=null && (
                <Col md={6}>
                  <SelectField
                    label={'Document Type'}
                    isRequired={true}
                    options={docuSubCategoryList}
                    value={DocumentStore.enrollmentRequest.docuSubCategoryKey}
                    onChange={e => this.onChangeSelect('docuSubCategoryKey', e.target.value)}
                  />
                </Col>
              )}
              
            </Row>

            {DocumentStore.enrollmentRequest.processFee != null && (
              <Row>
                {DocumentStore.enrollmentRequest.processFee != null && (
                  <Col md={6}>
                    <ProcessFeeCard data={DocumentStore.enrollmentRequest.processFee} />
                  </Col>
                )}
                <Col md={6}>
                  <SelectField
                    label={'Purpose'}
                    isRequired={true}
                    options={purposeKeyList}
                    value={DocumentStore.enrollmentRequest.purposeKey}
                    onChange={e => this.onChangeSelect('purposeKey', e.target.value)}
                  />
                </Col>
              </Row>
            )}

            {DocumentStore.enrollmentRequest.purposeKey!=null &&
             DocumentStore.enrollmentRequest.purposeKey==5 && (
              <BaseTextArea
                label={'Purpose'}
                rows={3}
                onChange={e => this.onChangeInputs('othPurpose', e.target.value)}
                value={DocumentStore.enrollmentRequest.othPurpose}
                isRequired={true}
              />
            )}
        </BasePanel>
        
        {(DocumentStore.enrollmentRequest.purposeKey!=null ||
          DocumentStore.enrollmentRequest.purpose!=null) && 
          DocumentStore.enrollmentRequest.docuSubCategoryKey!=26 &&
          (
          <DocumentPreviewPanel 
            docSubCategoryString={
              DocumentStore.enrollmentRequest.docuSubCategoryKeyString
            } 
            docCategoryString={
              DocumentStore.enrollmentRequest.docuCategoryKeyString
            }
            fullName={DocumentStore.enrollmentRequest.fullName}
            address={DocumentStore.enrollmentRequest.homeAddress}
            purpose={
              (DocumentStore.enrollmentRequest.purposeKey != null &&
              DocumentStore.enrollmentRequest.purposeKey != 5)
                ? DocumentStore.enrollmentRequest.purposeKeyString
                : DocumentStore.enrollmentRequest.othPurpose
            }
          />
        )}

        {(DocumentStore.enrollmentRequest.purposeKey!=null ||
          DocumentStore.enrollmentRequest.purpose!=null) && 
          DocumentStore.enrollmentRequest.docuSubCategoryKey==26 &&
          (
          <IdCardPreviewPanel 
            fullName={DocumentStore.enrollmentRequest.fullName}
            address={DocumentStore.enrollmentRequest.homeAddress}
            birthDate={DocumentStore.enrollmentRequest.birthDtString}
            sex={DocumentStore.enrollmentRequest.genderString}
            civilStatus={DocumentStore.enrollmentRequest.civilStatusString}
            contactNo={DocumentStore.enrollmentRequest.mobileNo}
          />
        )}
      </MainForm>
    );
  };

  onReset = () => {
    const { DocumentStore } = this.context.store;
    DocumentStore.reset();
  };

  onClickNext = () => {
    const { DocumentStore, SettingsStore } = this.context.store;

    DocumentStore.validateRequest(DocumentStore.enrollmentRequest, res => {
      DocumentStore.validatedData = res;
      DocumentStore.currentStep = StepperContants.MANUAL_ENROLL__CONFIRM;
    }, err => {
        SettingsStore.showModal({
          type: 'error',
          errorList: err
        })
    });
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

DocumentRequestPanel.contextType = StoreContext;

export default observer(DocumentRequestPanel);
