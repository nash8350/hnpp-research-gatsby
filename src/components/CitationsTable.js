import React from 'react';
import CitationFilter from '../components/CitationFilter';
import Content, { HTMLContent } from '../components/Content';
import {
  PagingState,
  IntegratedPaging,
  RowDetailState,
  SortingState,
  IntegratedSorting,
  DataTypeProvider
} from '@devexpress/dx-react-grid';
import {
  Grid, 
  Table, 
  TableHeaderRow, 
  TableColumnResizing,
  PagingPanel,
  TableRowDetail
} from '@devexpress/dx-react-grid-material-ui';

const tableWidth = 800;

const TitleFormatter = ({ value }) =>
  <span className="textwrap">{value}</span>;

const TitleTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={TitleFormatter}
    {...props}
  />
);

export default ({ citations }) => (
  <div className="columns">
    <div className="column is-2">
      <CitationFilter/>
    </div>
    <div className="column is-10">
      <Grid
        rows={citations}
        columns={[
          { name: 'date', title: 'Date' },
          { name: 'title', title: 'Title' },
          { name: 'numCitedBy', title: 'Cited By' }
        ]}>
        <PagingState
          defaultCurrentPage={0}
          pageSize={20}
        />
        <RowDetailState
          defaultExpandedRowIds={[]}
        />
        <SortingState
          defaultSorting={[{ columnName: 'date', direction: 'desc' }]}
        />
        <TitleTypeProvider
          for={['title']}
        />
        <IntegratedSorting />
        <IntegratedPaging />
        <Table />
        <TableColumnResizing defaultColumnWidths={[
          { columnName: 'date', width: 100 },
          { columnName: 'title', width: tableWidth-200 },
          { columnName: 'numCitedBy', width: 100 }
        ]}/>
        <TableHeaderRow 
          showSortingControls
        />
        <TableRowDetail
          contentComponent={({ row }) => (
            <div className="container is-pulled-left" style={{width: tableWidth}}>
              <h4 className="is-size-10 has-text-weight-bold is-bold-light vert-padded">Abstract</h4>
              <p>{row.abstract}</p>
              <h4 className="is-size-10 has-text-weight-bold is-bold-light vert-padded">Authors</h4>
              <p>{row.authorlist}</p>
              <h4 className="is-size-10 has-text-weight-bold is-bold-light vert-padded">Journal</h4>
              <p>{row.journal}</p>
              <h4 className="is-size-10 has-text-weight-bold is-bold-light vert-padded">Keywords</h4>
              <ul>
                {row.keywords.map(keyword => (
                  <li className="bullet">{keyword.keyword}</li>
                ))}
              </ul>
              <h4 className="is-size-10 has-text-weight-bold is-bold-light vert-padded">Links</h4>
              <a href={row.abstractLink}>View on Pubmed</a>
              <br/>
            </div>
          )}
        />
        <PagingPanel />
      </Grid>
    </div>
  </div>
);
