import { combineReducers } from 'redux';

import { loadingReducer } from './loadingReducer';
import { errorReducer } from './errorReducer';
import { userAccountsReducer } from './userAccountsReducer';
import { pageLoadingReducer } from './pageLoadingReducer';


export const rootReducer = combineReducers({
  loading: loadingReducer,
  error: errorReducer,
  userAccounts: userAccountsReducer,
  pageLoading: pageLoadingReducer,
})
