import axios from 'axios';
console.log(JSON.stringify(process.env.API_URL, null,
  1));
const instance = axios.create({ baseURL: process.env.API_URL, });
export default instance;

