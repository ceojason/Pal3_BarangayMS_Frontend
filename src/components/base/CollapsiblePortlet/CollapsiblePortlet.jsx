import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import { buildClassNames } from '../../../utils/ClassUtils';

class CollapsiblePortlet extends Component {
  constructor(props) {
    super(props);
    this.state={
      showCollapsePanel: false,
      showButtonPrefix: 'Show'
    };
  }

  showHidePanel = () => {
    this.setState({ 
      showCollapsePanel: !this.state.showCollapsePanel,
      showButtonPrefix: this.state.showCollapsePanel ? 'Show' : 'Hide'
    });
  };

  render() {
    const { 
      customClassName,
      headerData,
      headerDataLabel,
      buttonLabel,
      label
    } = this.props;
    const { showCollapsePanel, showButtonPrefix } = this.state;

    return (
      <div className={buildClassNames('collapseportlet_ctr', customClassName)}>
        <div className='collapseportlet_hdr'>
          {label!=null ? <span className='main_hdr_label'>{label}</span> : ''}
          {headerDataLabel!=null && <span className='header_data_label'><i class="bi bi-person-vcard-fill"></i>{headerDataLabel}</span>}
          {/* {headerDataLabel!=null && <span className='header_data_label'>{headerDataLabel}</span>} */}

          <div className='header_data_with_icon'>
            <i class="bi bi-dot"></i>
            <span>{headerData!=null ? headerData : ''}</span>
            <button class="collapse_btn" onClick={this.showHidePanel} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              {showButtonPrefix + " "}
              {buttonLabel!=null ? buttonLabel : 'Show More'}
              {!showCollapsePanel ? <i class="bi bi-caret-down-fill"></i> : <i class="bi bi-caret-up-fill"></i>}
            </button>
          </div>
        </div>

        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  };
};

CollapsiblePortlet.contextType = StoreContext;

export default observer(CollapsiblePortlet);
