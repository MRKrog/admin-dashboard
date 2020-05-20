import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PipelineActions from './PipelineActions';

import * as moment from 'moment';

const columns = [
  { id: 'product_title', label: 'Title', minWidth: 115 },
  { id: 'asset_created_timestamp', label: 'Requested', minWidth: 75 },
  { id: 'asset_stage', label: 'Stage', minWidth: 100 },
  { id: 'preview', label: '', minWidth: 50 },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const PipelineTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.pipeline.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow tabIndex={-1} key={row._id}>
                  <TableCell align='left'>
                    {row._source.product_title}
                  </TableCell>
                  <TableCell align='left'>
                    {moment(row._source.asset_created_timestamp).format("MM-DD-YYYY")}
                  </TableCell>
                  <TableCell align='left'>
                    <PipelineActions closeDrawer={props.closeDrawer} {...row._source}/>
                  </TableCell>
                  <TableCell align='left'>
                    preview
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.pipeline.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default PipelineTable;
