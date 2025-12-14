import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';

class BaseAddressField extends Component {
  static contextType = StoreContext;

  constructor(props) {
    super(props);
    this.state = {
      query: props.defaultValue || props.value || '',
      suggestions: [],
    };
    this.timeoutId = null;
  }

  componentDidUpdate(prevProps) {
    // Sync with props.value *only when it changes*
    if (prevProps.value !== this.props.value && this.props.value !== this.state.query) {
      this.setState({ query: this.props.value || '' });
    }
  }

  fetchSuggestions = (searchText) => {
    if (!searchText) {
      this.setState({ suggestions: [] });
      return;
    }
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        searchText
      )}&addressdetails=1&limit=5&countrycodes=ph`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ suggestions: data });
      })
      .catch(() => {
        this.setState({ suggestions: [] });
      });
  };

  onInputChange = (e) => {
    const val = e.target.value;
    this.setState({ query: val });

    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      this.fetchSuggestions(val);
    }, 300);
  };

  onSuggestionClick = (suggestion) => {
    this.setState({ query: suggestion.display_name, suggestions: [] });
    if (this.props.onPlaceSelected) {
      this.props.onPlaceSelected(suggestion);
    }
  };

  render() {
    const { label, placeholder = 'Enter address' } = this.props;
    const { query, suggestions } = this.state;

    return (
      <div className="base-address-field" style={{ position: 'relative' }}>
        {label && <label>{label}</label>}
        <input
          type="text"
          className="base_address_input"
          placeholder={placeholder}
          value={query}  // ✅ always use query, not props.value
          onChange={this.onInputChange}
          autoComplete="off"
        />

        {suggestions.length > 0 && (
          <ul
            style={{
              listStyleType: 'none',
              margin: 0,
              padding: 0,
              border: '1px solid #ccc',
              borderTop: 'none',
              maxHeight: 150,
              overflowY: 'auto',
              position: 'relative',
              width: '100%',
              backgroundColor: 'white',
              zIndex: 1000,
              cursor: 'pointer',
              'font-weight': 500,
            }}
          >
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                onClick={() => this.onSuggestionClick(suggestion)}
                style={{
                  padding: '8px',
                  borderBottom: '1px solid #eee',
                }}
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default observer(BaseAddressField);