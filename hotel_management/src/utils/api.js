import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to handle network errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === 'Network Error') {
      error.message = 'Network Error: Please ensure the local server is running (npm run server)';
    }
    return Promise.reject(error);
  }
);

export default api;
