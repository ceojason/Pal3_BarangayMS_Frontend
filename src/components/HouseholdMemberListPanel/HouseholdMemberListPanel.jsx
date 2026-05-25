import React, { Component } from 'react';
import StoreContext from '../../store/StoreContext';
import { observer } from 'mobx-react';

class HouseholdMemberListPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredIndex: null
    };
  }

  getAge = (birthDt) => {
    if (!birthDt) return null;
    const diff = Date.now() - new Date(birthDt).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  setHover = (index) => {
    this.setState({ hoveredIndex: index });
  };

  clearHover = () => {
    this.setState({ hoveredIndex: null });
  };

  render() {
    const { data } = this.props;
    const { hoveredIndex } = this.state;

    return (
      <div
        style={{
          background: '#fff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 16px',
            fontSize: '15px',
            fontWeight: 600,
            borderBottom: '1px solid #f1f5f9',
            color: '#111827'
          }}
        >
          Household Members
        </div>

        {/* Empty */}
        {!data || data.length === 0 ? (
          <div style={{ padding: 16, color: '#6b7280', fontSize: 14 }}>
            No household members found.
          </div>
        ) : (
          <div>
            {data.map((m, index) => {
              const age = this.getAge(m.birthDt);
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={m.id || index}
                  onMouseEnter={() => this.setHover(index)}
                  onMouseLeave={this.clearHover}
                  style={{
                    padding: '14px 16px',
                    borderBottom:
                      index !== data.length - 1 ? '1px solid #f3f4f6' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                    cursor: 'pointer',

                    // 🔥 stronger hover effect
                    background: isHovered ? '#f3f4f6' : '#ffffff',
                    transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
                    boxShadow: isHovered
                      ? '0 2px 8px rgba(0,0,0,0.08)'
                      : 'none',

                    transition: 'all 0.15s ease'
                  }}
                >
                  {/* Left */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>
                      {m.fullNm2 || m.fullNm}

                      {m.isHouseholdHead === 0 && (
                        <span
                          style={{
                            marginLeft: 8,
                            fontSize: 11,
                            padding: '2px 6px',
                            borderRadius: 6,
                            background: '#dbeafe',
                            color: '#1d4ed8',
                            fontWeight: 600
                          }}
                        >
                          Current Head
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      {m.gender ? `Gender: ${m.gender}` : ''}
                      {age ? ` • Age: ${age}` : ''}
                      {m.classificationKeyStringForDisplay
                        ? ` • ${m.classificationKeyStringForDisplay}`
                        : ''}
                    </div>

                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      {m.homeAddress}
                    </div>
                  </div>

                  {/* Right */}
                  <div
                    style={{
                      fontSize: 12,
                      color: '#9ca3af',
                      textAlign: 'right',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {m.dateEnrolledString}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

HouseholdMemberListPanel.contextType = StoreContext;

export default observer(HouseholdMemberListPanel);