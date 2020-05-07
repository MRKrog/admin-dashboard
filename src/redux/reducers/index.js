import { combineReducers } from 'redux';

import { loadingReducer } from './loadingReducer';
import { errorReducer } from './errorReducer';

export const rootReducer = combineReducers({
  loading: loadingReducer,
  error: errorReducer,
})
