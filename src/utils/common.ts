
export const BASE_URL = "http://localhost:8000/api/app/";
export const IMG_URL = "http://localhost:8000/";

export const getUser = () => {
  const userStr = localStorage.getItem("currentUser");
  return userStr ? JSON.parse(userStr) : null;
};

export const getData = () => {
  const userData = localStorage.getItem("data");
  return userData ? JSON.parse(userData) : null;
};

// return the token from the session storage
export const getToken = () => {
  return localStorage.getItem("token") || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem('currentUser');
};

// set the token and user from the session storage
export const setUserSession = (token: string, user?: any) => {
  localStorage.setItem("token", token);
  localStorage.setItem("currentUser", JSON.stringify(user));
};
