'use client'
import { AxiosResponse } from 'axios';
import clientAxios from './Axios';

export const createUser = async (usuario:any) => {
  try {
    const response: AxiosResponse<any, any> = await clientAxios.post('user',usuario);
    return response.data;
  } catch (error:any) {
    return error.response.data.statusCode;
  }
}

export const createProf = async (data:any) => {
  try {
    const response: AxiosResponse<any, any> = await clientAxios.post('user/prof',data);
    return response.status;
  } catch (error:any) {
    return error.response.data.statusCode;
  }
}

export const getInfoUser = async (): Promise<{ username: string; role: string, name:string, lastname:string, dni:number, phone:number }> => {
  const response: AxiosResponse<any, any> = await clientAxios.get('user/info');
  return response.data.usuario;
}

export const getAllClients = async (): Promise<any[]> => {
  const response: AxiosResponse<any, any> = await clientAxios.get('user/clients');
  return response.data;
}

export const getAllProf = async (): Promise<any[]> => {
  const response: AxiosResponse<any, any> = await clientAxios.get('user/prof');
  return response.data;
}

export const updateClient = async (data:any) => {
  try {
    const response: AxiosResponse<any, any> = await clientAxios.put('user/client',data);
    return response.data;
  } catch (error:any) {
    return error.response.data.statusCode;
  }
}

export const updateProf = async (data:any) => {
  try {
    const response: AxiosResponse<any, any> = await clientAxios.put('user/prof',data);
    return response.status;
  } catch (error:any) {
    return error.response.data.statusCode;
  }
}

export const deleteClient = async (id:number) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clientAxios.delete('/user/client/'+id);
    return respuesta.status;
  } catch (error:any) {
    return error.response.data.statusCode;
  }
}

export const deleteProf = async (id:number) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clientAxios.delete('/user/prof/'+id);
    return respuesta.status;
  } catch (error:any) {
    return error.response.data.statusCode;
  }
}