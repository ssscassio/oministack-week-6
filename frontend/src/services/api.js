import axios from 'axios';

export const baseURL = 'https://omnistack-week.herokuapp.com';
const api = axios.create({
  baseURL: baseURL
});

export default api;
