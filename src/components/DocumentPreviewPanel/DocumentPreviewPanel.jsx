import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';
import BasePanel from '../base/BasePanel/BasePanel';
import paliparan_icon from '../../assets/images/paliparan_icon.jpg';

class DocumentPreviewPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, hideHeader } = this.props;

    return (
      <BasePanel hideHeader={hideHeader} header={hideHeader ? '' : 'Sample Preview'} icon={hideHeader ? '' : <i className="bi bi-envelope-paper-fill"></i>}>
        <div className='file_preview_ctr'>
          <div className='file_header white_line'>
            {data.header}
            <img src={paliparan_icon} alt='Logo' className='preview_img'/>
          </div>
          <div className='file_body white_line'>
            {data.body.split("\n").map((line, idx) => (
              <div
                key={idx}
                className={idx === 0 ? 'first_line' : ''}
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
          </div>
          <div className='file_footer white_line'>
            {data.footer.split("\n").map((line, idx) => (
              <div key={idx} dangerouslySetInnerHTML={{ __html: line }} />
            ))}
          </div>
        </div>
      </BasePanel>
    );
  }
};

DocumentPreviewPanel.contextType = StoreContext;

export default observer(DocumentPreviewPanel);
