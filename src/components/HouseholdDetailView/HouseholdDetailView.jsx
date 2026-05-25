import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseTemplate from '../base/BaseTemplate/BaseTemplate';
import { Col, Row } from 'react-bootstrap';
import ViewPortlet, { ViewField } from '../base/ViewPortlet/ViewPortlet';
import BasePanel from '../base/BasePanel/BasePanel';
import HouseholdMemberListPanel from '../../components/HouseholdMemberListPanel/HouseholdMemberListPanel';
import SelectField from '../base/SelectField/SelectField';

class HouseholdDetailView extends Component {
  constructor(props) {
    super(props);
     this.state={
      memberList: [],
      statusList: []
     };
  }

  componentDidMount() {
    this.findMembersById();

    const { HouseholdStore } = this.context.store;
    HouseholdStore.getStatusListForHousehold().then((list) => {
      this.setState({ statusList: list.statusListForHousehold });
    });
  };

  findMembersById = async () => {
    const { data } = this.props;
    const { HouseholdStore } = this.context.store;

    const res = await HouseholdStore.findMembersById(data.id);

    this.setState({ memberList: res }, () => {
      HouseholdStore.enrollmentRequest.id = data.id;
      HouseholdStore.enrollmentRequest.userId = data.userId;
      HouseholdStore.enrollmentRequest.status = data.status;
    });
  };

  onChangeSelect = (fieldId, val) => {
    const { HouseholdStore } = this.context.store;

    if (val!=null && val.key!=null) {
      HouseholdStore.enrollmentRequest[fieldId]=val.key;
    }else{
      HouseholdStore.enrollmentRequest[fieldId]=null;
    }
  }

  render() {
    const { HouseholdStore, SettingsStore } = this.context.store;
    const { data } = this.props;
    const { memberList, statusList } = this.state;

    return (
      <Fragment>
        <BaseTemplate {...this.props}>
          <BasePanel
            header={'Household Details'}
            icon={<i class="bi bi-house-lock-fill"></i>}>
            <ViewPortlet>
              {SettingsStore.showSuccessPanel && (
                <div className='my_profile_changes_saved_banner'>
                  <span><i class="bi bi-check-circle-fill"></i>{SettingsStore.successMsg.ackMessage}</span>
                </div>
              )}
              {SettingsStore.showErrorPanel && (
                <div className='my_profile_changes_error_banner'>
                  <span><i class="bi bi-exclamation-circle-fill"></i>{SettingsStore.errorList[0]}</span>
                </div>
              )}
              <Row>
                <Col md={5}>
                  <SelectField
                    label={'Household Head'}
                    value={HouseholdStore.enrollmentRequest.userId}
                    options={memberList}
                    isRequired={true}
                    onChange={e => this.onChangeSelect('userId', e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <SelectField
                    label={'Status'}
                    value={HouseholdStore.enrollmentRequest.status}
                    options={statusList}
                    isRequired={true}
                    onChange={e => this.onChangeSelect('status', e.target.value)}
                    inst={'Note: The system will allow same household address upon registration if set to Inactive'}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <ViewField
                    // label={'Household Members'}
                    value={<HouseholdMemberListPanel data={data.members} />}
                  />
                </Col>
              </Row>
            </ViewPortlet>
          </BasePanel>
        </BaseTemplate>
      </Fragment>
    );
  }
};

HouseholdDetailView.contextType = StoreContext;

export default observer(HouseholdDetailView);
