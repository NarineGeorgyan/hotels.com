import axios from 'axios';

export const register = async (user) =>
  await axios.post(`${import.meta.env.VITE_APP_API}/register`, user);

export const login = async (user) =>
  await axios.post(`${import.meta.env.VITE_APP_API}/login`, user);

  
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem('auth')) {
    let auth = JSON.parse(localStorage.getItem('auth'));
    auth.user = user;
    localStorage.setItem('auth', JSON.stringify(auth));
    next();
  }
};
