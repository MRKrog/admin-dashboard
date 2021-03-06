export const setLoading = loading => ({
  type: "SET_LOADING",
  loading
});

export const setError = error => ({
  type: "SET_ERROR",
  error
});

export const setUserAccounts = data => ({
  type: "SET_USER_ACCOUNTS",
  data
});

export const setUserAccountUpdate = data => ({
  type: "SET_USER_ACCOUNT_UPDATE",
  data
});

export const setPageLoading = loading => ({
  type: "SET_PAGE_LOADING",
  loading
});


export const setUserAccountDelete = data => ({
  type: "SET_USER_ACCOUNT_DELETE",
  data
});