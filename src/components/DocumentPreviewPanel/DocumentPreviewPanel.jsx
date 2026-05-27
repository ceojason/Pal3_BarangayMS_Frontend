// =========================
// DocumentPreviewPanel.jsx
// =========================

import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BasePanel from '../base/BasePanel/BasePanel';
import paliparan_icon from '../../assets/images/paliparan_icon.jpg';

class DocumentPreviewPanel extends Component {
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
    const {
      hideHeader,
      isGeneratingPdf,
      fullName,
      address,
      docCategoryString,
      docSubCategoryString,
      purpose,
      dateIssued
    } = this.props;

    const currentDate = new Date().toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <BasePanel
        hideHeader={hideHeader}
        header={hideHeader ? '' : 'Official Document Preview'}
      >

        <div className={`file_preview_ctr ${isGeneratingPdf ? 'pdf_mode' : ''}`}>

          {/* WATERMARK */}
          <div className="document_watermark">
            <img
              src={paliparan_icon}
              alt="Seal"
            />
          </div>

          {/* HEADER */}
          <div className="file_header header_layout">

            <div className="header_text">

              <div className="gov_title">
                REPUBLIC OF THE {this.state.country}
              </div>

              <div className="gov_subtitle">
                Barangay {this.state.barangayNm} • {this.state.municipalAddress}, {this.state.province}
              </div>

              <div className="doc_type">
                {docCategoryString} • {docSubCategoryString}
              </div>

            </div>

            <div className="header_logo">
              <img
                src={paliparan_icon}
                alt="Barangay Logo"
              />
            </div>

          </div>

          {/* BODY */}
          <div className="file_body">

            <div className="doc_paragraph">
              TO WHOM IT MAY CONCERN:
            </div>

            <div className="doc_paragraph mt-2">
              This is to certify that <b>{fullName}</b>,
              a bona fide resident of <b>{address}</b>,
              is known to this office as a person of good moral character and standing in the community.
            </div>

            {purpose && (
              <div className="purpose_section">

                <div className="purpose_label">
                  PURPOSE
                </div>

                <div className="purpose_value">
                  {purpose}
                </div>

              </div>
            )}

            <div className="doc_paragraph mt-2">
              Issued this <b>{dateIssued != null ? dateIssued : currentDate}</b>
              {' '}at Barangay {this.state.barangayNm}, {this.state.municipalAddress}, {this.state.province}.
            </div>

            <div className="doc_paragraph mt-3">
              This document is issued upon request for whatever legal purpose it may serve.
            </div>

          </div>

          {/* FOOTER */}
          <div className="file_footer">

            <div className="footer_text">
              Certified True and Correct
            </div>

            <div className="footer_subtext">
              Barangay {this.state.barangayNm} • Official Document System
            </div>

          </div>

        </div>

      </BasePanel>
    );
  }
}

DocumentPreviewPanel.contextType = StoreContext;

export default observer(DocumentPreviewPanel);