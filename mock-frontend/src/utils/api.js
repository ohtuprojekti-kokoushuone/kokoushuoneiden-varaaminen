import axios from 'axios';
import { baseUrl, inProduction, testRun } from '../config';
import { getMockUserHeaders } from './mockUser';

const api = axios.create({
  baseURL: baseUrl
});

if (!testRun) {
  const mockUserHeaders = inProduction ? {} : getMockUserHeaders();
  api.interceptors.request.use((config) => {
    const headers = {
      ...config.headers,
      ...mockUserHeaders
    };

    const newConfig = { ...config, headers };

    return newConfig;
  });
}

export default api;
