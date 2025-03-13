import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import apiClient from './apiClient';

const underlyingInstance = apiClient.getAxiosInstance();

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

underlyingInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1];
    const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken='))?.split('=')[1];
    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    if (refreshToken && config.headers) {
      config.headers['x-refresh-token'] = refreshToken;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

underlyingInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
          }
          return underlyingInstance(originalRequest);
        });
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken='))?.split('=')[1];
      if (!refreshToken) {
        return Promise.reject(error);
      }
      
      return new Promise((resolve, reject) => {
        axios
          .post(`${underlyingInstance.defaults.baseURL}/auth/refresh`, { refreshToken })
          .then(({ data }) => {
            document.cookie = `accessToken=${data.accessToken}; path=/;`;
            underlyingInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
            processQueue(null, data.accessToken);
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
            }
            resolve(underlyingInstance(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            document.cookie = `accessToken=; path=/;`;
            document.cookie = `refreshToken=; path=/;`;
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    
    return Promise.reject(error);
  }
);
