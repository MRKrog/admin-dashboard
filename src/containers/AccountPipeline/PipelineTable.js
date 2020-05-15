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
console.log(props.pipeline)
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
                    <PipelineActions {...row._source}/>
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
/// moment(row._source.asset_created_timestamp).format("MM-DD-YYYY")
/// asset_hash={row._source.asset_hash}
// asset_stage={row._source.asset_stage}
// asset_completion_timestamp={row._source.asset_completion_timestamp}
// _id: "31685891326045"
// _index: "product_variant_shopify"
// _score: 30.501173
// _source: {id: 31685891326045, title: "2 / white", price: "90.00", sku: "AD-02-white-2", position: 2, …}
// _type: "_doc"


// admin_graphql_api_id: "gid://shopify/ProductVariant/31685891326045"
// asset_completion_timestamp: "est 4/20"
// asset_created_timestamp: "2020-04-28T19:21:59.628450"
// asset_hash: "as3fnas3"
// asset_stage: 3
// asset_status: true
// asset_updated_timestamp: "2020-05-08T17:51:26.914719"
// barcode: null
// compare_at_price: "0.00"
// created_at: "2019-12-17T17:02:10-05:00"
// fulfillment_service: "manual"
// grams: 0
// id: 31685891326045
// image_id: null
// image_url: {id: 14312497283165, position: 1, created_at: "2019-12-17T17:02:09-05:00", updated_at: "2019-12-17T17:02:09-05:00", alt: null, …}
// inventory_item_id: 33360417423453
// inventory_management: "shopify"
// inventory_policy: "deny"
// inventory_quantity: 30
// levar_user_account_id: "6a8a7d53-1b98-4f38-b735-98d928f6dfaf"
// old_inventory_quantity: 30
// option1: "2"
// option2: "white"
// option3: null
// order_count: 0
// position: 2
// price: "90.00"
// product_id: 4465881448541
// product_title: "ADIDAS | KID'S STAN SMITH"
// product_type: "SHOES"
// product_vendor: "ADIDAS"
// requires_shipping: true
// returns_rank: 0
// sales_rank: 0
// shopify_asset_status: false
// sku: "AD-02-white-2"
// store_url: "ben-levar-test.myshopify.com"
// taxable: true
// title: "2 / white"
// total_refunds: 0
// total_sales: 0
// updated_at: "2019-12-17T17:02:10-05:00"
// weight: 0
// weight_unit: "lb"
