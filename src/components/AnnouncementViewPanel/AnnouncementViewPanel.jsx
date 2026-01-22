import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseTemplate from '../base/BaseTemplate/BaseTemplate';
import ViewPortlet, { ViewField } from '../base/ViewPortlet/ViewPortlet';
import BasePanel from '../base/BasePanel/BasePanel';
import { Col, Row } from 'react-bootstrap';
import StepperContants from '../../../contants/StepperContants';

class AnnouncementViewPanel extends Component {
  constructor(props) {
    super(props);
  }

  submitForm = () => {
    const { AnnouncementStore, SettingsStore } = this.context.store;

    AnnouncementStore.saveRequest(AnnouncementStore.validatedData, res => {
      AnnouncementStore.validatedData=null;
      AnnouncementStore.ackHeader.ackMessage=res.ackMessage;
      AnnouncementStore.ackHeader.refNo=res.refNo;
      AnnouncementStore.savedData=res;
      AnnouncementStore.currentStep=StepperContants.MANUAL_ENROLL__ACK;
      SettingsStore.showSuccessPanel=true;
    }, err => {
      SettingsStore.showModal({ type: 'error', errorList: err });
    });
  };

  getViewPanel = () => {
    const { data } = this.props;

    return (
      <Fragment>
        <ViewPortlet {...this.props}>
          <BasePanel header={'Announcement Information'}>
            <Row>
              <Col md={12}>
                <ViewField
                  label={'Recipients'}
                  value={data.recipientListString}
                  customClassName={'with_highlight'}
                  icon={<i class="bi bi-person-check-fill"></i>}
                />
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <ViewField
                  label={'Type'}
                  value={data.typeString}
                />
              </Col>
              <Col md={4}>
                <ViewField
                  label={'Status'}
                  value={data.alertTypeString}
                />
              </Col>
              <Col md={4}>
                <ViewField
                  label={'Channel'}
                  value={data.channelString}
                />
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <ViewField
                  label={'Header'}
                  value={data.header}
                />
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <ViewField
                  label={'Message'}
                  value={data.message}
                  isMessage={true}
                />
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <ViewField
                  label={'Recipients Type'}
                  value={data.recipientTypeString}
                />
              </Col>
            </Row>
          </BasePanel>
        </ViewPortlet>
      </Fragment>
    );
  };

  render() {
    const { isConfirm, isAck, onClickBack } = this.props;

    return (
      <BaseTemplate
        isAck={isAck}
        onClickNext={isConfirm ? () => this.submitForm() : null}
        onClickBack={onClickBack}
        {...this.props}>
          {this.getViewPanel()}
      </BaseTemplate>
    );
  };
};

AnnouncementViewPanel.contextType = StoreContext;

export default observer(AnnouncementViewPanel);
