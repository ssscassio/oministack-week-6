import axios from 'axios';

// TODO: Change for my heroku application
export const baseURL = 'https://omnistack-week.herokuapp.com';
const api = axios.create({
  baseURL: baseURL
});

export default api;
