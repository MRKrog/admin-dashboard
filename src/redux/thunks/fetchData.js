import * as actions from '../actions/index';

export const fetchData = () => {
  return async (dispatch) => {
    try {
      dispatch(actions.setLoading(true));
      dispatch(actions.setLoading(false));
    } catch (error) {
      dispatch(actions.setError(error.message));
    }
  }
}
