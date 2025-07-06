import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL });
api.defaults.headers.common['Content-Type'] = 'application/json';

export default api;

// api.post('/auth/signup');
//http://localhost:8888/auth/api
