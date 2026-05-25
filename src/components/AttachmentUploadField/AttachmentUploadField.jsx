import React, { Component } from 'react';

class AttachmentUploadField extends Component {
  onChangeFiles = (e) => {
    const { onChange = () => {}, files = [] } = this.props;

    const selectedFiles = Array.from(e.target.files);

    // ✅ KEEP BOTH: preview + real File for backend
    const validFiles = selectedFiles
      .filter(file =>
        file.type.startsWith('image/') ||
        file.type.startsWith('video/')
      )
      .map(file => ({
        file, // ✔ REAL FILE (IMPORTANT FOR SPRING)
        url: URL.createObjectURL(file)
      }));

    onChange([...files, ...validFiles]);

    e.target.value = '';
  };

  onRemoveFile = (index) => {
    const { files = [], onChange } = this.props;

    URL.revokeObjectURL(files[index]?.url);

    onChange(files.filter((_, i) => i !== index));
  };

  renderPreview = (item) => {
    if (!item?.file?.type) return null;

    if (item.file.type.startsWith('image/')) {
      return <img src={item.url} alt="" />;
    }

    if (item.file.type.startsWith('video/')) {
      return <video src={item.url} controls />;
    }

    return null;
  };

  render() {
    const { label, files = [], isRequired } = this.props;

    const safeFiles = Array.isArray(files) ? files : [];

    return (
      <div className="attachment">

        <div className="attachment__label">
          {label}
          {isRequired && <span>*</span>}
        </div>

        <div className="attachment__grid">

          {safeFiles.map((item, index) => (
            <div className="attachment__card" key={index}>

              <div className="attachment__media">
                {this.renderPreview(item)}
              </div>

              <div className="attachment__overlay">
                <span className="attachment__name">
                  {item.file?.name}
                </span>

                <button
                  type="button"
                  className="attachment__remove"
                  onClick={() => this.onRemoveFile(index)}
                >
                  ✕
                </button>
              </div>

            </div>
          ))}

          {files!=null && files.length < 1 && (
            <label className="attachment__add">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={this.onChangeFiles}
              />
              <span>＋</span>
            </label>
          )}

        </div>
      </div>
    );
  }
}

export default AttachmentUploadField;