import axios from 'axios';
import config from '../config';

const client = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Authorization: {
      toString () {
        const token = localStorage.getItem(config.localStorageTokenKey)

        if (!token) {
          return null
        }

        return `${config.tokenPrefix} ${token}`
      }
    }
  }
});

client.interceptors.response.use((response) => response, (error) => {

  if (error.response.status === 403) {
    localStorage.removeItem(config.localStorageTokenKey);
    window.location.reload();
  }

  return Promise.reject(error);
})

export default client;