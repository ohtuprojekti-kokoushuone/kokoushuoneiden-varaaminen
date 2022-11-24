import axios from 'axios';
import { baseUrl, inProduction } from '../config';
import { getMockUserHeaders } from './mockUser';

const mockUserHeaders = inProduction ? {} : getMockUserHeaders();

const api = axios.create({
  baseURL: baseUrl
});

api.interceptors.request.use((config) => {
  const headers = {
    ...config.headers,
    ...mockUserHeaders
  };

  const newConfig = { ...config, headers };

  return newConfig;
});

export default api;
