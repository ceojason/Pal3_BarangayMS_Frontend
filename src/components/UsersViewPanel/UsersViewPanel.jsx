import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseTemplate from '../base/BaseTemplate/BaseTemplate';
import ViewPortlet, { ViewField } from '../base/ViewPortlet/ViewPortlet';
import BasePanel from '../base/BasePanel/BasePanel';
import { Col, Row } from 'react-bootstrap';
import StepperContants from '../../../contants/StepperContants';

class UsersViewPanel extends Component {
  constructor(props) {
    super(props);
    this.state={
      profileImage: null,
    };
  }

  componentDidMount() {
    const { SessionStore, UsersStore } = this.context.store;
    const { data } = this.props;

    const userId = data!=null && data.id;
    if (userId) {
      UsersStore.getProfileImage(userId).then((imageUrl) => {
        if (imageUrl) {
          this.setState({ profileImage: imageUrl });
        }
      });
    }
  };

  submitForm = () => {
    const { UsersStore, SettingsStore } = this.context.store;
    SettingsStore.isLoading=true;

    UsersStore.saveEnrollment(UsersStore.validatedData, res => {
      SettingsStore.isLoading=false;
      UsersStore.validatedData=null;
      UsersStore.ackHeader.ackMessage=res.ackMessage;
      UsersStore.ackHeader.refNo=res.refNo;
      UsersStore.savedData=res;
      UsersStore.currentStep=StepperContants.MANUAL_ENROLL__ACK;
      SettingsStore.showSuccessPanel=true;
    }, err => {
        SettingsStore.isLoading=false;
        SettingsStore.showModal({ type: 'error', errorList: err });
      }
    );
  };

  getViewPanel = () => {
    const { data, isView } = this.props;
    const { profileImage } = this.state;

    return (
      <Fragment>
        <ViewPortlet {...this.props}>
          <BasePanel header={'Personal Information'} icon={<i class="bi bi-person-circle"></i>}>
            <Row>
              <Col md={6}>
                <ViewField
                  label={'Full Name'}
                  value={data.fullNm}
                  customClassName={'with_highlight'}
                  icon={<i class="bi bi-person-check-fill"></i>}
                  modalDisplay={profileImage} 
                />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <ViewField
                  label={'Birth Date'}
                  value={data.birthDtString}
                />
              </Col>
              <Col md={6}>
                <ViewField
                  label={'Birth Place'}
                  value={data.birthPlace}
                />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <ViewField
                  label={'Gender'}
                  value={data.genderDscp}
                />
              </Col>
              <Col md={6}>
                <ViewField
                  label={'Civil Status'}
                  value={data.civilStatusString}
                />
              </Col>
            </Row>
          </BasePanel>

          <BasePanel header={'Contact Information'} icon={<i class="bi bi-telephone-forward-fill"></i>}>
            <Row>
              <Col md={4}>
                <ViewField
                  label={'Contact Number'}
                  value={data.mobileNo}
                />
              </Col>
              <Col md={4}>
                <ViewField
                  label={'Email Address'}
                  value={data.emailAddress}
                />
              </Col>
              <Col md={4}>
                <ViewField
                  label={'Purok'}
                  value={data.phaseString}
                />
              </Col>
            </Row>
          </BasePanel>

          <BasePanel header={'Address, Household, and Other Information'} icon={<i class="bi bi-geo-fill"></i>}>
            <Row>
              <Col md={6}>
                <ViewField
                  label={'Home Address'}
                  value={data.homeAddress}
                />
              </Col>
              <Col md={6}>
                <ViewField
                  label={'Household'}
                  value={null}
                />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <ViewField
                  label={'Occupation'}
                  value={data.occupation}
                />
              </Col>
              <Col md={6}>
                <ViewField
                  label={'Religion'}
                  value={data.religion}
                />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <ViewField
                  label={'Is a Registered Voter?'}
                  value={data.isRegisteredVoterString}
                />
              </Col>
              <Col md={6}>
                <ViewField
                  label={'Resident Classification'}
                  value={data.classificationTypeString}
                />
              </Col>
            </Row>
          </BasePanel>
        </ViewPortlet>
      </Fragment>
    );
  };

  render() {
    const { isConfirm, onClickBack, isAck, isView } = this.props;

    return (
      <BaseTemplate
        isAck={isAck}
        onClickNext={isConfirm ? () => this.submitForm() : null}
        onClickBack={onClickBack}
        {...this.props}>
          {this.getViewPanel()}
      </BaseTemplate>
    );
  }
};

UsersViewPanel.contextType = StoreContext;

export default observer(UsersViewPanel);
