export const userAccountsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_ACCOUNTS':
      return action.data
    case 'SET_USER_ACCOUNT_UPDATE':
      let users = state.filter(user => action.data.id !== user.id);
      return [...users, action.data]
    default:
      return state
  }
}
