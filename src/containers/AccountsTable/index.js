import React from 'react';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { makeStyles, fade } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import * as moment from 'moment';



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'business_name', numeric: false, disablePadding: false, label: 'Business' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'website_url', numeric: false, disablePadding: false, label: 'Domain' },
  { id: 'created_at', numeric: true, disablePadding: false, label: 'Created' },
  { id: 'view', numeric: false, disablePadding: false, label: '' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    maxWidth: 800,
    marginBottom: theme.spacing(2),
  },
  table: {
    width: '100%'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableContainer: {
    maxHeight: "680px"
  },
  hideCopy: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: "250px"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function AccountsTable({ allUsers }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('business_name');
  const [selected, setSelected] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [userAccounts, setuserAccounts] = React.useState();
  const userAccounts = useSelector(state => state.userAccounts);

   React.useEffect(() => {
    const results = userAccounts.filter(person =>
      person.email.toLowerCase().includes(search)
    );
    // console.log(results);
    // setuserAccounts(results);
  }, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleMoreInfo = () => {

  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {};

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, userAccounts.length - page * rowsPerPage);
  // console.log(emptyRows);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer className={classes.tableContainer}>
          <div className="Account-Actions">
            <section className="Title">
              <h1>levAR Accounts</h1>
            </section>
            <section className="Account-Search">
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  name="search"
                  onChange={handleSearch}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </section>
          </div>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
            stickyHeader
            aria-label="sticky table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={userAccounts.length}
            />
            <TableBody>
              {stableSort(userAccounts, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell align="left">{row.business_name}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell className={classes.hideCopy} align="left">{row.website_url}</TableCell>
                      <TableCell align="left">{moment(row.created_at).format("MM-DD-YYYY")}</TableCell>
                      <TableCell align="left">
                        <Tooltip title="More Info">
                          <button className="MoreInfoBtn" onClick={handleMoreInfo}>
                            <i className="far fa-plus"></i>
                          </button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={userAccounts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

// accepts_marketing: null
// address: "222 West Merchandise Mart Plaza #1212"
// business_name: "LevAR Demo"
// city: "Chicago"
// country: "United States"
// created_at: "2020-04-12T17:55:49.000Z"
// email: "daniel+demo@latticework.io"
// first_name: "Daniel"
// id: 3
// last_name: "Esrig"
// phone_number: "8473236561"
// setup_wizard_state: 5
// state: "Illinois"
// stripe_id: "cus_GjBuvctBjwVwV4"
// user_shopify_url: null
// uuid: "9a219350-f35b-4284-9a00-2cceae2bf262"
// website_url: "https://ecommerce-demo.levar.io"
// zip: "60654"


// handleSearch = event => {
//   const {data} = this.state
//   let filteredDatas = []
//   filteredDatas = data.filter(e => {
//       let mathesItems = Object.values(e)
//       let retVal = true;
//       mathesItems.forEach(e => {
//           const regex = new RegExp(event.target.value, 'gi')
//           if (typeof e == 'string')
//               retVal = e.match(regex)
//       })
//       return retVal;
//   })
//   this.setState({filterData: filteredDatas, searchValue: event.target.value})
// }
