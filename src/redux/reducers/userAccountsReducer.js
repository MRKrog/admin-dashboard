export const userAccountsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_ACCOUNTS':
      return action.data
    case 'SET_USER_ACCOUNT_UPDATE':
      let users = state.filter(user => action.data.id !== user.id);
      return [...users, action.data]
    case 'SET_USER_ACCOUNT_DELETE':
      console.log(action.data.id)
      let filteredUsers = state.filter(user => action.data.id !== user.id);
      return [...filteredUsers]
    default:
      return state
  }
}
