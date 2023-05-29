
export const BASE_URL = "http://localhost:8000/api/app/";
export const IMG_URL = "http://localhost:8000/";

export const getUser = () => {
  const userStr = sessionStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

export const getData = () => {
  const userData = sessionStorage.getItem("data");
  if (userData) return JSON.parse(userData);
  else return null;
};

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem('user');
};

// set the token and user from the session storage
export const setUserSession = (token: string, user?: any) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};
