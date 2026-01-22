import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import { buildClassNames } from '../../../utils/ClassUtils';

class BaseColumnWithSubData extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, subData, className } = this.props;

    return (
      <div className='base_col'>
        <span className={'main_data'}>{data}</span>
        <span className={buildClassNames('sub_data', className)}>{subData}</span>
      </div>
    );
  }
};

BaseColumnWithSubData.contextType = StoreContext;

export default observer(BaseColumnWithSubData);
