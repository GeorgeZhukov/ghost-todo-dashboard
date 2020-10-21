import axios from 'axios';
import config from '../config';

export default axios.create({
  baseURL: config.apiUrl,
  headers: {
    Authorization: {
      toString () {
        const token = localStorage.getItem('token')

        if (!token) {
          return null
        }

        return `Token ${token}`
      }
    }
  }
});