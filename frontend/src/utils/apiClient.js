import axios from 'axios';

// Decide API base URL at runtime so it still works
// even if Vercel env vars are missing.
const envBase = import.meta.env.VITE_API_BASE_URL;

const runtimeBase =
  envBase ||
  (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')
    ? 'https://digitek.onrender.com/api'
    : '/api');

const api = axios.create({
  baseURL: runtimeBase
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


