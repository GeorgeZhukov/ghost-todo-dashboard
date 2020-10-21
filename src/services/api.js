import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8000/',
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