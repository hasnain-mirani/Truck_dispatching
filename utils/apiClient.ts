import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { env } from '../env.mjs';

class ApiClient {
  private instance: AxiosInstance;
  
  constructor() {
    this.instance = axios.create({
      baseURL: env.NEXT_PUBLIC_BACKEND_URL,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  }

  public getAxiosInstance(): AxiosInstance {
    return this.instance;
  }

  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      headers['x-refresh-token'] = refreshToken;
    }
    return headers;
  }

  public async get<T>(url: string, authenticated: boolean = false, config: AxiosRequestConfig = {}) {
    if (authenticated) {
      config.headers = { ...config.headers, ...this.getAuthHeaders() };
    }
    return this.instance.get<T>(url, config);
  }

  public async post<T>(url: string, data: unknown, authenticated: boolean = false, config: AxiosRequestConfig = {}) {
    if (authenticated) {
      config.headers = { ...config.headers, ...this.getAuthHeaders() };
    }
    return this.instance.post<T>(url, data, config);
  }

  public async put<T>(url: string, data: unknown, authenticated: boolean = false, config: AxiosRequestConfig = {}) {
    if (authenticated) {
      config.headers = { ...config.headers, ...this.getAuthHeaders() };
    }
    return this.instance.put<T>(url, data, config);
  }

  public async delete<T>(url: string, authenticated: boolean = false, config: AxiosRequestConfig = {}) {
    if (authenticated) {
      config.headers = { ...config.headers, ...this.getAuthHeaders() };
    }
    return this.instance.delete<T>(url, config);
  }
}

export default new ApiClient();
