import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const requestOtp = async (email: string) => {
  const res = await api.post('/auth/request-otp', { email });
  return res.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const res = await api.post('/auth/verify-otp', { email, otp });
  const { token, user } = res.data;

  localStorage.setItem('token', token);
  return user;
};

export const setUserRole = async (role: string) => {
  const res = await api.post('/user/role', { role });
  return res.data;
};

export const getUserProfile = async () => {
  const res = await api.get('/user/profile');
  return res.data;
};

export const updateUserProfile = async (name: string) => {
  const res = await api.put('/user/update', { name });
  return res.data;
};

export const logout = async () => {
    await api.get('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}