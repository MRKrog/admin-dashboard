export const userAccountsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_ACCOUNTS':
      return action.data
    default:
      return state
  }
}
