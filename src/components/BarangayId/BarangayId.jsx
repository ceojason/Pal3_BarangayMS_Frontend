import React, { Component } from 'react';

class BarangayIDCard extends Component {
  render() {
    const { data = {} } = this.props;

    return (
      <div className="barangay_id_wrapper">

        {/* CARD */}
        <div className="barangay_id_card">

          {/* HEADER */}
          <div className="barangay_id_header">
            <div className="barangay_logo">
              <i className="bi bi-building"></i>
            </div>

            <div className="barangay_title">
              <h3>BARANGAY ID</h3>
              <span>Republic of the Philippines</span>
              <span>Barangay e-System</span>
            </div>
          </div>

          {/* BODY */}
          <div className="barangay_id_body">

            {/* PHOTO */}
            <div className="barangay_id_photo">
              {data.profileImage ? (
                <img src={data.profileImage} alt="Resident" />
              ) : (
                <i className="bi bi-person-circle"></i>
              )}
            </div>

            {/* DETAILS */}
            <div className="barangay_id_details">
              <div className="id_name">
                {data.fullNm || 'Juan Dela Cruz'}
              </div>

              <div className="id_row">
                <span className="label">Birth Date:</span>
                <span>{data.birthDtString || 'N/A'}</span>
              </div>

              <div className="id_row">
                <span className="label">Gender:</span>
                <span>{data.genderDscp || 'N/A'}</span>
              </div>

              <div className="id_row">
                <span className="label">Address:</span>
                <span>{data.homeAddress || 'N/A'}</span>
              </div>

              <div className="id_row">
                <span className="label">Contact:</span>
                <span>{data.mobileNo || 'N/A'}</span>
              </div>

              <div className="id_row">
                <span className="label">Purok:</span>
                <span>{data.phaseString || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="barangay_id_footer">
            <span>Valid for Barangay Transactions Only</span>
          </div>

        </div>
      </div>
    );
  }
}

export default BarangayIDCard;