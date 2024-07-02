'use client'
import { AxiosResponse } from 'axios';
import clientAxios from './Axios';

export const createUser = async (usuario:any) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clientAxios.post('user',usuario);
    return respuesta.data;
  } catch (error:any) {
    return error.response.data.statusCode;
  }
}

export const getInfoUser = async (): Promise<{ username: string; role: string, name:string, lastname:string, dni:number, phone:number }> => {
  const response: AxiosResponse<any, any> = await clientAxios.get('user/info');
  return response.data.usuario;
}