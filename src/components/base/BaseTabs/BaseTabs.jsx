import React, { Component } from 'react';

class BaseTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.defaultActiveTab || 0
    };
  }

  onTabClick = (index) => {
    this.setState({ activeTab: index });
    if (this.props.onTabChange) {
      this.props.onTabChange(index);
    }
  };

  render() {
    const { tabs } = this.props; // [{ label: 'Tab 1', content: <Comp /> }, ...]
    const { activeTab } = this.state;

    return (
      <div>
        <ul className="nav nav-tabs" role="tablist">
          {tabs.map((tab, i) => (
            <li className="nav-item" role="presentation" key={i}>
              <button
                id={`tab-${i}`}
                className={`nav-link ${activeTab === i ? 'active' : ''}`}
                type="button"
                role="tab"
                aria-selected={activeTab === i}
                aria-controls={`tabpanel-${i}`}
                onClick={() => this.onTabClick(i)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="tab-content" style={{ marginTop: '1rem' }}>
          {tabs.map((tab, i) => (
            <div
              key={i}
              id={`tabpanel-${i}`}
              role="tabpanel"
              aria-labelledby={`tab-${i}`}
              hidden={activeTab !== i}
              className={`tab-pane fade ${activeTab === i ? 'show active' : ''}`}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default BaseTabs;