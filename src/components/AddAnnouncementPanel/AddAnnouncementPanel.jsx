import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseTemplate from '../base/BaseTemplate/BaseTemplate';
import MainForm from '../base/MainForm/MainForm';
import BasePanel from '../base/BasePanel/BasePanel';
import { Col, Row } from 'react-bootstrap';
import InputField from '../base/InputField/InputField';
import SelectField from '../base/SelectField/SelectField';
import BaseTextArea from '../base/BaseTextArea/BaseTextArea';
import GroupCheckboxesField from '../base/GroupCheckboxesField/GroupCheckboxesField';
import StepperContants from '../../../contants/StepperContants';

class AddAnnouncementPanel extends Component {
  constructor(props) {
    super(props);
    this.state={
      smsTypeList: [],
      alertStatusList: [],
      channelList: [],
      classificationList: []
    };
  }

  componentDidMount() {
    const { AnnouncementStore } = this.context.store;

    AnnouncementStore.getSmsTypeList().then((list) => {
      const filteredList = list.smsTypeList.filter(
        item => item.key !== 0 // remove user registration
      );

      this.setState({ smsTypeList: filteredList });
    });

    AnnouncementStore.getAlertStatusList().then((list) => {
      this.setState({ alertStatusList: list.alertStatusList });
    });

    AnnouncementStore.getChannelList().then((list) => {
      this.setState({ channelList: list.channelList });
    });

    AnnouncementStore.getAllResidentTypeList().then((list) => {
      this.setState({ classificationList: list.allResidentTypeList });
    });
  };

  onChangeInputs = (fieldId, val) => {
    const { AnnouncementStore } = this.context.store;

    if (val!=null) {
      AnnouncementStore.enrollmentRequest[fieldId]=val;
    }else{
      AnnouncementStore.enrollmentRequest[fieldId]=null;
    }
  };

  onChangeSelect = (fieldId, val) => {
    const { AnnouncementStore } = this.context.store;

    if (val!=null && val.key!=null) {
      AnnouncementStore.enrollmentRequest[fieldId]=val.key;
    }else{
      AnnouncementStore.enrollmentRequest[fieldId]=null;
    }
  };

  form = () => {
    const { AnnouncementStore } = this.context.store;
    const { smsTypeList, alertStatusList, channelList, classificationList } = this.state;

    return (
      <MainForm>
        <BasePanel header={'Announcement Information'}>
          <Row>
            <Col md={12}>
              <InputField
                label={'Header'}
                maxLength={255}
                isRequired={true}
                type={'text'}
                value={AnnouncementStore.enrollmentRequest.header}
                onChange={e => this.onChangeInputs('header', e.target.value)}
              />
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <SelectField
                label={'Type'}
                isRequired={true}
                options={smsTypeList}
                value={AnnouncementStore.enrollmentRequest.type}
                onChange={e => this.onChangeSelect('type', e.target.value)}
              />
            </Col>
            <Col md={4}>
              <SelectField
                label={'Status'}
                isRequired={true}
                options={alertStatusList}
                value={AnnouncementStore.enrollmentRequest.alertStatus}
                onChange={e => this.onChangeSelect('alertStatus', e.target.value)}
              />
            </Col>
            <Col md={4}>
              <SelectField
                label={'Channel'}
                isRequired={true}
                options={channelList}
                value={AnnouncementStore.enrollmentRequest.isSmsEmail}
                onChange={e => this.onChangeSelect('isSmsEmail', e.target.value)}
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <BaseTextArea
                label={'Message'}
                rows={10}
                onChange={e => this.onChangeInputs('message', e.target.value)}
                value={AnnouncementStore.enrollmentRequest.message}
                isRequired={true}
              />
            </Col>
          </Row>

          <Row>
            <GroupCheckboxesField
              values={classificationList}
              label={'Choose Recipients'}
              value={'key'}
              itemLabel={'value'}
              store={AnnouncementStore.enrollmentRequest.recipientKeys}
              startingIndex={1000}
              customClassName={'checkboxes_displayinrow'}
              required={true}
              inst={'Select all applicable'}
            />
          </Row>
        </BasePanel>
      </MainForm>
    );
  };

  onClickNext = () => {
    const { AnnouncementStore, SettingsStore } = this.context.store;

    AnnouncementStore.validateRequest(
      AnnouncementStore.enrollmentRequest, res => {
        AnnouncementStore.validatedData = res;
        AnnouncementStore.currentStep = StepperContants.MANUAL_ENROLL__CONFIRM;
      }, error => {
        SettingsStore.showModal({
          type: 'error',
          errorList: error
        })
      }
    );
  };

  onReset = () => {
    const { AnnouncementStore } = this.context.store;

    AnnouncementStore.reset();
  };

  render() {
    return (
      <BaseTemplate
       {...this.props}
       onClickNext={() => this.onClickNext()}
       onReset={() => this.onReset()}
      currentStep={1}
      totalSteps={3}>
        {this.form()}
      </BaseTemplate>
    );
  }
};

AddAnnouncementPanel.contextType = StoreContext;

export default observer(AddAnnouncementPanel);
