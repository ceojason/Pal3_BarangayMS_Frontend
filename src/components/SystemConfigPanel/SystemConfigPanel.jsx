import React, { Component, Fragment } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BaseTemplate from '../base/BaseTemplate/BaseTemplate';
import MainForm from '../base/MainForm/MainForm';
import BasePanel from '../base/BasePanel/BasePanel';
import { Col, Row } from 'react-bootstrap';
import SelectField from '../base/SelectField/SelectField';

import InputField from '../base/InputField/InputField';
import RadioButtonField from '../base/RadioButtonField/RadioButtonField';
import BaseButton from '../base/BaseButton/BaseButton';

class SystemConfigPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configList: [],
      regionList: [],
      pricingList: []
    };
  }

  componentDidMount() {
    const { SystemConfigStore } = this.context.store;

    SystemConfigStore.getConfigList().then((list) => {
      this.setState({ configList: list.systemConfigList });
    });

    SystemConfigStore.getRegionList().then((list) => {
      this.setState({ regionList: list.regionList });
    });
  }

  onChangeSelect = (fieldId, val) => {
    const { SystemConfigStore } = this.context.store;

    const value = val?.key ?? null;

    SystemConfigStore.enrollmentRequest[fieldId] = value;
    if (fieldId=='configCd' && value=='CONFIG_PRICING') {
      this.getFeePricing();
    }
  };

  getFeePricing = () => {
    const { SystemConfigStore } = this.context.store;

    SystemConfigStore.getFeePricingList().then((res) => {
      this.setState({ pricingList: res });

      if (res && res.length > 0) {
        res.forEach(item => {
          if (item.id) {
            SystemConfigStore.enrollmentRequest[item.id] = item.processFee;
          }
        });
      }
    });
  };

  onChangeInput = (fieldId, val) => {
    const { SystemConfigStore } = this.context.store;
    SystemConfigStore.enrollmentRequest[fieldId] = val;
  };

  onClickUpdate = () => {
    const { SystemConfigStore, SettingsStore } = this.context.store;
    let request = SystemConfigStore.enrollmentRequest;

    SettingsStore.showModal({
      type: 'update',
      headerTitle: 'Update Service Configuration',
      valueToDisplay: 'this service configuration',
      data: request,
      additionalBtn: (data, closeModal) => (
        <BaseButton
          customClassName="btn_update"
          label="Save"
          onClick={() => this.onProcessUpdate(data, closeModal)}
        />
      )
    });
  };

  onProcessUpdate = (data, closeModal) => {
    const { SystemConfigStore, SettingsStore } = this.context.store;
    let request = SystemConfigStore.enrollmentRequest;

    window.scrollTo(0, 0);
    SystemConfigStore.validateAndUpdate(request, res => {
      SettingsStore.showSuccessPanel=true;
      SettingsStore.successMsg = {
        ackMessage: res.ackMessage
      };
      setTimeout(() => {
        SettingsStore.showSuccessPanel = false;
        SettingsStore.successMsg = {};
      }, 10000);
    }, error => {
      SettingsStore.showErrorPanel = true;
      SettingsStore.errorList = error;
      setTimeout(() => {
        SettingsStore.showErrorPanel = false;
        SettingsStore.errorList = [];
      }, 10000);
    });
    closeModal && closeModal();
  };

  configPanel = () => {
    const { SystemConfigStore, SettingsStore } = this.context.store;
    const { configList, regionList, pricingList } = this.state;

    return (
      <BaseTemplate
        onClickUpdate={() => this.onClickUpdate()}
        {...this.props}
        header={'System Configurations'}
        subHeader={'View, modify, and manage system configurations here.'}>
        <MainForm>
          <BasePanel
            header={'Configuration Details'}
            icon={<i className="bi bi-gear"></i>}>
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
              <Col md={12}>
                <SelectField
                  label={'Service'}
                  isRequired={true}
                  options={configList}
                  value={SystemConfigStore.enrollmentRequest.configCd}
                  onChange={e => this.onChangeSelect('configCd', e.target.value)}
                />
              </Col>
            </Row>

            {SystemConfigStore.enrollmentRequest.configCd === 'CONFIG_GLOBAL' && (
              <Fragment>
                <Row>
                  <Col md={12}>
                    <div className="form-check form-switch">

                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="switchCheckChecked"
                        checked={SystemConfigStore.enrollmentRequest.maintenanceMoode || false}
                        onChange={(e) =>
                          this.onChangeInput('maintenanceMoode', e.target.checked)
                        }
                      />

                      <label
                        className="form-check-label"
                        htmlFor="switchCheckChecked"
                      >
                        Maintenance Mode
                      </label>

                    </div>
                  </Col>
                </Row>
              </Fragment>
            )}

            {(SystemConfigStore.enrollmentRequest.configCd!=null &&
              SystemConfigStore.enrollmentRequest.configCd=='CONFIG_BRGY_SETTINGS') && (
                <Fragment>
                  {/* <div className='form_divider'></div> */}
                    <Row>
                      <Col md={6}>
                        <InputField
                          label={'Barangay Name'}
                          maxLength={255}
                          isRequired={true}
                          type={'text'}
                          value={SystemConfigStore.enrollmentRequest.barangayNm}
                          onChange={e => this.onChangeInputs('barangayNm', e.target.value)}
                        />
                      </Col>
                      <Col md={6}>
                        <InputField
                          label={'Municipal Address'}
                          maxLength={255}
                          isRequired={true}
                          type={'text'}
                          value={SystemConfigStore.enrollmentRequest.municipalAddress}
                          onChange={e => this.onChangeInputs('municipalAddress', e.target.value)}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <InputField
                          label={'Province'}
                          maxLength={255}
                          isRequired={true}
                          type={'text'}
                          value={SystemConfigStore.enrollmentRequest.province}
                          onChange={e => this.onChangeInputs('province', e.target.value)}
                        />
                      </Col>
                      <Col md={6}>
                        <InputField
                          label={'Zip Code'}
                          maxLength={10}
                          isRequired={true}
                          type={'text'}
                          value={SystemConfigStore.enrollmentRequest.zipCode}
                          onChange={e => this.onChangeInputs('zipCode', e.target.value)}
                          onlyNumber={true}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <SelectField
                          label={'Region'}
                          isRequired={true}
                          options={regionList}
                          value={SystemConfigStore.enrollmentRequest.region}
                          onChange={e => this.onChangeSelect('region', e.target.value)}
                        />
                      </Col>
                      <Col md={6}>
                        <InputField
                          label={'Country'}
                          maxLength={10}
                          isRequired={true}
                          disabled={true}
                          value={SystemConfigStore.enrollmentRequest.country}
                        />
                      </Col>
                    </Row>
                </Fragment>
            )}

            {SystemConfigStore.enrollmentRequest.configCd === 'CONFIG_PRICING' && (
              <Fragment>
                {Object.entries(
                  pricingList.reduce((acc, item) => {
                    const key = item.docCatKeyString;

                    if (!acc[key]) {
                      acc[key] = [];
                    }

                    acc[key].push(item);

                    return acc;
                  }, {})
                ).map(([groupName, items]) => (
                  <div
                    key={groupName}
                    style={{
                      marginBottom: '25px',
                      padding: '15px',
                      borderRadius: '10px',
                      border: '1px solid #e6e6e6',
                      background: '#fafafa'
                    }}
                  >

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '15px',
                        borderLeft: '5px solid #0d6efd',
                        paddingLeft: '10px'
                      }}
                    >
                      <h5 style={{
                        margin: 0,
                        fontWeight: 700,
                        color: '#0d6efd',
                        letterSpacing: '0.3px',
                        fontSize: '14px'
                      }}>
                        {groupName}
                      </h5>
                    </div>

                    {/* ITEMS */}
                    <Row>
                      {items.map(item => (
                        <Col md={6} key={item.id} className="mb-3">

                          <InputField
                            label={item.docSubCatKeyString + ' Fee'}
                            value={SystemConfigStore.enrollmentRequest[item.id]}
                            onChange={e =>
                              this.onChangeInput(item.id, e.target.value)
                            }
                            currency="₱"
                          />

                        </Col>
                      ))}
                    </Row>

                  </div>
                ))}
              </Fragment>
            )}
          </BasePanel>
        </MainForm>
      </BaseTemplate>
    );
  };
  

  onChangeInputs = (fieldId, val) => {
    const { SystemConfigStore } = this.context.store;

    if (val!=null&& val.trim() !== '') {
      SystemConfigStore.enrollmentRequest[fieldId]=val;
    }else{
      SystemConfigStore.enrollmentRequest[fieldId]=null;
    }
  }

  render() {
    return this.configPanel();
  }
}

SystemConfigPanel.contextType = StoreContext;

export default observer(SystemConfigPanel);