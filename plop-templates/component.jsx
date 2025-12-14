import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';

class {{pascalCase name}} extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      </div>
    );
  }
};

{{pascalCase name}}.contextType = StoreContext;

export default observer({{pascalCase name}});
