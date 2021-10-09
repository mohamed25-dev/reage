import axios from "axios";

const Auth = {
  login: user => {
    localStorage.setItem('user', JSON.stringify(user));
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
  },

  init: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    axios.defaults.headers.common['Authorization'] = user ? 'Bearer ' + user.token : '';
  },

  auth: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  guest: () => {
    return localStorage.getItem('user') === null || localStorage.getItem('user') === 'undefined';
  },

  logout: () => {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('user');
    return;
  },

  getToken: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.token : '';
  },

  getUser: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  },

  setUser: (updatedUser) => {
    const user = JSON.parse(localStorage.getItem('user'));
    updatedUser.token = user.token;

    localStorage.setItem('user', JSON.stringify(updatedUser));
  }
}

export default Auth;