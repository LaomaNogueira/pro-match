import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IHttpService } from '@/domain/services-interfaces/http/http-service.interface';

export class AxiosClientService implements IHttpService<any, any, any> {
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axios.get<T>(url, config);
  }

  public async patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axios.patch<T>(url, data, config);
  }

  public async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axios.put<T>(url, data, config);
  }

  public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axios.post<T>(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axios.delete<T>(url, config);
  }
}
