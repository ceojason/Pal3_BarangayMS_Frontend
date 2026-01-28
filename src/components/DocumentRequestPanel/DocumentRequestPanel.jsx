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

class DocumentRequestPanel extends Component {
  constructor(props) {
    super(props);
    this.state={
      documentTypeList: []
    };
  }

  componentDidMount() {
    const { DocumentStore } = this.context.store;

    DocumentStore.getDocumentTypeList().then((list) => {
      this.setState({ documentTypeList: list.documentTypeList });
    });
  };

  onChangeSelect = (fieldId, val) => {
    const { DocumentStore } = this.context.store;

    if (val!=null && val.key!=null) {
      DocumentStore.enrollmentRequest[fieldId]=val.key;
    }else{
      DocumentStore.enrollmentRequest[fieldId]=null;
    }
  };

  onChangeInputs = (fieldId, val) => {
    const { DocumentStore } = this.context.store;

    if (val!=null) {
      DocumentStore.enrollmentRequest[fieldId]=val;
    }else{
      DocumentStore.enrollmentRequest[fieldId]=null;
    }
  };

  form = () => {
    const { DocumentStore } = this.context.store;
    const { documentTypeList } = this.state;

    return (
      <MainForm>
        <BasePanel
          icon={<i class="bi bi-envelope-paper-fill"></i>}
          header={'Document Information'}>
            <Row>
              <Col md={12}>
                <SelectField
                  label={'Document Type'}
                  isRequired={true}
                  options={documentTypeList}
                  value={DocumentStore.enrollmentRequest.documentType}
                  onChange={e => this.onChangeSelect('documentType', e.target.value)}
                />
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <BaseTextArea
                  label={'Purpose'}
                  rows={10}
                  onChange={e => this.onChangeInputs('purpose', e.target.value)}
                  value={DocumentStore.enrollmentRequest.purpose}
                  isRequired={true}
                />
              </Col>
            </Row>
        </BasePanel>
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
