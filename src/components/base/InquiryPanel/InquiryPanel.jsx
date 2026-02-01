import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import { buildClassNames } from '../../../utils/ClassUtils';
import { Col, Row } from 'react-bootstrap';
import InputField from '../InputField/InputField';
import { downloadPDF } from '../../../utils/DownloadUtils';
import BaseButton from '../BaseButton/BaseButton';


class InquiryPanel extends Component {
  constructor(props) {
    super(props);
  }

  chunkFields = (fields, size = 3) => {
    const chunks = [];
    for (let i = 0; i < fields.length; i += size) {
      chunks.push(fields.slice(i, i + size));
    }
    return chunks;
  };

  search = () => {
    const { onSearch } = this.props;
    onSearch&&onSearch();
  };

  onClickReset = () => {
    const { onReset } = this.props;
    onReset&&onReset();
  };

  onClickDownload = () => {
    const { columns, data, fileTitle, fileName } = this.props;
    if (!columns || !data) return;

    const totalCount = data.length;

    downloadPDF({
      data,
      columns,
      title: fileTitle || 'Download Report',
      fileName: fileName || 'report.pdf',
      totalCount, // Pass total count to the PDF generator
    });
  };

  getSearchFilters = () => {
    const { filterList, hasDownload, data } = this.props;

    if (!filterList) return null;
    const fieldRows = this.chunkFields(filterList, 3);

    return (
      <div className='searchfilter_ctr'>
        <div className='searchfilter_btn'>
          <div className='btns'>
            <button
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
              className='toggle_btn'>
              <i className="bi bi-search"></i>Toggle Filters
            </button>
            {(hasDownload && data!=null && data.length > 0) && (
              <BaseButton
                customClassName={'download_btn'}
                onClick={this.onClickDownload}
                hasIcon={true}
                icon={<i class="bi bi-download"></i>}
                label={'Download'}
              />
            )}
          </div>

          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <div className='searchfilter_form'>
                {fieldRows.map((row, rowIndex) => (
                  <Row key={rowIndex} className="mb-3"> {/* spacing between rows */}
                    {row.map((field) => (
                      <Col key={field.index} md={4}>
                        <div className="form-group">
                          {this.renderFilterField(field)}
                        </div>
                      </Col>
                    ))}
                  </Row>
                ))}
              </div>

              <div className='search_btn'>
                <BaseButton
                  onClick={this.onClickReset}
                  customClassName={'mainsearch_resetbtn'}
                  label={'Reset Filter'}
                />
                <BaseButton
                  onClick={this.search}
                  customClassName={'mainsearch_btn'}
                  label={'Search'}
                  hasIcon={true}
                  icon={<i className="bi bi-search"></i>}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  };

  renderFilterField = (field) => {
    const commonProps = {
      id: field.index,
      name: field.index,
      label: field.label,
      value: field.value ?? '',
      onChange: (e) => {
        let val = e.target.value;
        if (field.props?.onlyNumber && val!=null) {
          val = val.replace(/\D/g, '');
        }
        field.value = val;
      },
      ...field.props
    };

    switch (field.type) {
      case 'text':
        return <InputField customClassName={'inputField_sf'} type="text" {...commonProps} />;
      case 'select':
        return (
          <select className="form-select" {...commonProps}>
            <option value="">Select {field.label}</option>
            {(field.options || []).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      // Extendable for more types in the future (checkbox, date, etc.)
      default:
        return <input type="text" {...commonProps} />;
    }
  };

  render() {
    const {
      header,
      subHeader,
      hasSearchFilter,
      customClassName,
      hasDivider,
      icon
    } = this.props;

    return (
      <div className={buildClassNames('inquirypanel_ctr', customClassName)} style={{ overflowX: 'auto', width: '100%' }}>
        <div className='inquirypanel_hdr'>
          {header!=null && <span className='main_hdr'>{icon}{header}</span>}
          {subHeader!=null && <span className='subheader'>{subHeader}</span>}
        </div>
        
        {hasDivider && <div className='form_divider'></div>}
        {hasSearchFilter && this.getSearchFilters()}

        <div className='inquirypanel_body'>
          {this.props.children}
        </div>
      </div>
    );
  }
};

InquiryPanel.defaultProps = {
  hasDownload: true
};

InquiryPanel.contextType = StoreContext;

export default observer(InquiryPanel);
