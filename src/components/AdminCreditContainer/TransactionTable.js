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

import * as moment from 'moment';

const columns = [
  { id: 'name1', label: 'Type', minWidth: 170 },
  { id: 'name2', label: 'Ammount', minWidth: 100 },
  { id: 'name3', label: 'Stripe ID', minWidth: 100 },
  { id: 'name4', label: 'Date', minWidth: 100 },
  { id: 'name5', label: 'Status', minWidth: 100 },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 300,
  },
});

export default function StickyHeadTable(props) {
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

  console.log(props.userTransactions)
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
            {props.userTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow tabIndex={-1} key={row.id}>
                  <TableCell align='left'>
                    {row.transaction_type}
                  </TableCell>
                  <TableCell align='left'>
                    {row.credit_amount}
                  </TableCell>
                  <TableCell align='left'>
                    {row.stripe_invoice_id}
                  </TableCell>
                  <TableCell align='left'>
                    {moment(row.date_created).format("MM-DD-YYYY")}
                  </TableCell>
                  <TableCell align='left'>
                    {row.status}
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
        count={props.userTransactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


// credit_amount: 1
// date_created: "2020-01-17T21:08:07.000Z"
// id: 1
// levar_user_id: 3
// status: null
// stripe_invoice_id: "ch_1G2230HUKD3cSJNOB3nDjGvc"
// stripe_invoice_url: "https://pay.stripe.com/receipts/acct_1FSojpHUKD3cSJNO/ch_1G2230HUKD3cSJNOB3nDjGvc/rcpt_GZANlAQw99wS3KcUf39bNbHLrW219qA"
// transaction_type: "credit"
