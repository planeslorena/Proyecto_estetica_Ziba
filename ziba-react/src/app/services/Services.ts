'use client'
import { AxiosResponse } from 'axios';
import clientAxios from './Axios';

export const getInfoServices = async (): Promise<any> => {
  const response: AxiosResponse<any, any> = await clientAxios.get('services');
  return response.data;
}