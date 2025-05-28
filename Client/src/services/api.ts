import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

export const requestOtp = (email: string) =>
  API.post('/auth/request-otp', { email });

export const verifyOtp = (email: string, otp: string) =>
    API.post('/auth/verify-otp', { email, otp });
  
export const setUserRole = (role: string, token: string) =>
    API.post(
      '/user/role',
      { role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    export const getUserProfile = (token: string) =>
        API.get('/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
      
      export const updateUserName = (name: string, token: string) =>
        API.put(
          '/user/profile',
          { name },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      