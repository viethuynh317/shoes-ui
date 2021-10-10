export const getLocalStorageToken = () => {
  return localStorage.getItem("token");
};

export const setLocalStorageToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeLocalStorageToken = () => {
  localStorage.removeItem("token");
};
