import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import DataTable from 'react-data-table-component';

class InquiryTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      columns,
      data,
      pagination,
      highlightOnHover
    } = this.props;
    const { SettingsStore } = this.context.store;
    
    const mappedColumns = columns.map(col => ({
      ...col,
      selector: row => row[col.index],
      sortable: col.isSortable || true,
      sortFunction: col.sortBy
        ? (rowA, rowB) => {
            if (rowA[col.sortBy] > rowB[col.sortBy]) return 1;
            if (rowA[col.sortBy] < rowB[col.sortBy]) return -1;
            return 0;
          }
        : undefined
    }));

    return (
      <div className='inquirytable_ctr'>
        <DataTable
          responsive={true}
          columns={mappedColumns}
          data={data}
          pagination={pagination}
          highlightOnHover={highlightOnHover}
          noDataComponent={<div className="no_data">{SettingsStore.isInitialSearch ? 'No data to show.' : 'No records found.'}</div>}
        />
      </div>
    );
  }
};

InquiryTable.defaultProps = {
  pagination: true,
  highlightOnHover: true
};

InquiryTable.contextType = StoreContext;

export default observer(InquiryTable);
