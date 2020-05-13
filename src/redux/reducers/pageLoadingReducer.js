export const pageLoadingReducer = (state = false, action) => {
  switch(action.type){
    case "SET_PAGE_LOADING":
      return action.loading;
    default:
      return state
  }
}

/// Set a defaul in case its not loading