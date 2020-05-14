import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
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
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import * as moment from 'moment';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import ExtensionIcon from '@material-ui/icons/Extension';

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
  { id: 'business_name', numeric: false, disablePadding: false, label: 'Business', align: 'left' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email', align: 'left' },
  { id: 'website_url', numeric: false, disablePadding: false, label: 'Domain', align: 'left' },
  { id: 'created_at', numeric: true, disablePadding: false, label: 'Created', align: 'left' },
  { id: 'setup_wizard_state', numeric: true, disablePadding: false, label: 'Wizard', align: 'center' },
  { id: 'view', numeric: false, disablePadding: false, label: '', align: 'left' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
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
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
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
    maxHeight: '76vh',
    minHeight: '76vh'
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
  selectInput: {
    padding: '8.5px 14px',
    paddingRight: '32px'
  },
}));

const AccountsTable = (props) => {
  const classes = useStyles();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('created_at');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [search, setSearch] = useState('krog');
  const [searchAccounts, setSearchAccounts] = useState([]);
  const [selectColumn, setSelectColumn] = useState('business_name');
  const dispatch = useDispatch();

  const userAccounts = useSelector(state => state.userAccounts);

  useEffect(() => {
    const searchResults = userAccounts.filter(user => {
      if(user[selectColumn] === null) return null
      if(user[selectColumn].toLowerCase().includes(search)) {
        return user
      } else {
        return null
      }
    });
    setSearchAccounts(searchResults);
  }, [search, userAccounts, selectColumn]);

  const handleSearch = (event) => {
    let searchText = (event.target.value).toLowerCase()
    setSearch(searchText);
  };

  const handleColumnSelect = (event) => {
    setSelectColumn(event.target.value);
  }

  const deleteUser = async (id, uuid) => {
    dispatch(actions.setPageLoading(true));
    try {
      // const url = `http://localhost:3005/api/v1/masterDelete/${id}/${uuid}`
      // const response = await fetch(url, {method: 'DELETE'})
      // const data = await response.json() 
      dispatch(actions.setUserAccountDelete({ id }));
    } catch(e) {
      console.log(e)
    }
    dispatch(actions.setPageLoading(false));
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
          <div className="Account-Actions">
            <section className="Title">
              <h1>levAR Accounts</h1>
            </section>
            <section className="Account-Search">
              <div>
                <Select
                  id="user-account-select"
                  variant='outlined'
                  autoWidth
                  value={selectColumn}
                  onChange={handleColumnSelect}
                >
                  <MenuItem value='business_name'>Business Name</MenuItem>
                  <MenuItem value='email'>Email</MenuItem>
                  <MenuItem value='website_url'>Website</MenuItem>
                  <MenuItem value='created_at'>Created</MenuItem>
                </Select>
              </div>
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
        <TableContainer className={classes.tableContainer}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            stickyHeader
            aria-label="sticky table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {
                stableSort(search ? searchAccounts : userAccounts, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  return (
                    <TableRow tabIndex={-1} key={user.id}>
                      <TableCell align="left">{user.business_name}</TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell className={classes.hideCopy} align="left">
                        <a href={`http://${user.website_url}`} target="_blank" rel="noopener noreferrer">{user.website_url}</a>
                      </TableCell>
                      <TableCell align="left">{moment(user.created_at).format("MM-DD-YYYY")}</TableCell>
                      <TableCell align="center">{user.setup_wizard_state}</TableCell>
                      <TableCell align="left" className={classes.accountBtn}>
                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                          { user.setup_wizard_state === 5 &&
                          <Button onClick={props.toggleDrawer('accountInfoDrawer', true, user.id, user.uuid)}>
                            <Tooltip title="Account Info">
                              <PersonIcon style={{ color: '#ffffff' }} />
                            </Tooltip>
                          </Button>
                          }
                          { user.setup_wizard_state === 5 &&
                          <Button onClick={props.toggleDrawer('accountPipelineDrawer', true, user.id, user.uuid)}>
                            <Tooltip title="Asset Pipeline">
                              <ExtensionIcon style={{ color: '#ffffff' }} />
                            </Tooltip>
                          </Button>
                          }
                          { user.setup_wizard_state === 5 &&
                          <Button >
                            <Tooltip title="View Live Site">
                              <VisibilityIcon style={{ color: '#ffffff' }} />
                            </Tooltip>
                          </Button>
                          }
                          <Button onClick={() => deleteUser(user.id, user.uuid)}>
                            <Tooltip title="Delete Account">
                              <DeleteIcon style={{ color: '#ffffff' }} />
                            </Tooltip>
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={search ? searchAccounts.length : userAccounts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default AccountsTable;


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
