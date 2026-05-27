import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BasePanel from '../base/BasePanel/BasePanel';
import paliparan_icon from '../../assets/images/paliparan_icon.jpg';
import default_profile from '../../assets/images/user.png';

class IdPreviewPanel extends Component {
  constructor(props) {
    super(props);
    this.state={
      barangayNm: null,
      municipalAddress: null,
      province: null,
      zipCode: null,
      country: null
    };
  }

  async componentDidMount() {
    const { DocumentStore } = this.context.store;

    const CONFIG_BRGY_SETTINGS = 'CONFIG_BRGY_SETTINGS';

    try {
      const res = await DocumentStore.findConfigById(CONFIG_BRGY_SETTINGS);

      this.setState({
        barangayNm: res?.barangayNmString ?? null,
        municipalAddress: res?.municipalAddressString ?? null,
        province: res?.provinceString ?? null,
        zipCode: res?.zipCodeString ?? null,
        country: res?.countryString ?? null,
      });

    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { hideHeader } = this.props;

    const {
      fullName,
      address,
      birthDate,
      sex,
      civilStatus,
      contactNo,
      refNo,
      profilePic
    } = this.props;

    return (
      <BasePanel
        hideHeader={hideHeader}
        header={hideHeader ? '' : 'Barangay ID Preview'}
      >

        <div className="barangayid_ctr">

          {/* BACKGROUND DESIGN */}
          <div className="barangayid_bg"></div>

          {/* HEADER */}
          <div className="barangayid_header">

            <div className="barangayid_header_left">

              <img
                src={paliparan_icon}
                alt="Barangay Logo"
                className="barangay_logo"
              />

              <div className="barangayid_header_text">

                <span className="ph_text">
                  REPUBLIC OF THE {this.state.country}
                </span>

                <span className="brgy_text">
                  BARANGAY {this.state.barangayNm}
                </span>

                <span className="city_text">
                  {this.state.municipalAddress}, {this.state.province}
                </span>

              </div>

            </div>

            <div className="id_label">
              BARANGAY ID
            </div>

          </div>

          {/* BODY */}
          <div className="barangayid_body">

            {/* LEFT SIDE */}
            <div className="barangayid_left">

              <div className="profile_container">
                <img
                  src={profilePic || default_profile}
                  alt="Resident"
                />
              </div>

              <div className="id_number">
                {'Barangay Resident'}
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="barangayid_right">

              <div className="resident_name">
                {fullName || 'JUAN DELA CRUZ'}
              </div>

              <div className="resident_info">

                <div className="info_row">
                  <span className="label">Address</span>
                  <span className="value">
                    {address}
                  </span>
                </div>

                <div className="info_row">
                  <span className="label">Birthdate</span>
                  <span className="value">
                    {birthDate}
                  </span>
                </div>

                <div className="info_row">
                  <span className="label">Gender</span>
                  <span className="value">
                    {sex}
                  </span>
                </div>

                <div className="info_row">
                  <span className="label">Civil Status</span>
                  <span className="value">
                    {civilStatus}
                  </span>
                </div>

                <div className="info_row">
                  <span className="label">Contact No.</span>
                  <span className="value">
                    {contactNo}
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* FOOTER */}
          <div className="barangayid_footer">

            <div className="signature_section">

              <div className="signature_line"></div>

              <span>
                Barangay Captain
              </span>

            </div>

            <div className="validity_text">
              VALID UNTIL 2027
            </div>

          </div>

        </div>

      </BasePanel>
    );
  }
}

IdPreviewPanel.contextType = StoreContext;

export default observer(IdPreviewPanel);