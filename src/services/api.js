import axios from 'axios';
import config from '../config';

export default axios.create({
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