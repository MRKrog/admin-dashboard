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
