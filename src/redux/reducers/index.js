import { combineReducers } from 'redux';

import { loadingReducer } from './loadingReducer';
import { errorReducer } from './errorReducer';
import { userAccountsReducer } from './userAccountsReducer';

export const rootReducer = combineReducers({
  loading: loadingReducer,
  error: errorReducer,
  userAccounts: userAccountsReducer,
})
