'use client'
import { AxiosResponse } from 'axios';
import clientAxios from './Axios';

export const getInfoServices = async (): Promise<any> => {
  const response: AxiosResponse<any, any> = await clientAxios.get('services');
  return response.data;
}

export const getServicesForAdmin = async (): Promise<any> => {
  const response: AxiosResponse<any, any> = await clientAxios.get('services/admin');
  return response.data;
}

export const getAllAppointments = async (): Promise<any> => {
  const response: AxiosResponse<any, any> = await clientAxios.get('services/appointments');
  return response.data;
}

export const getSpecialtiesWhitoutProf = async (): Promise<any> => {
  const response: AxiosResponse<any, any> = await clientAxios.get('services/specialties');
  return response.data;
}

export const getSpecialtiesWhitProf = async (): Promise<any> => {
  const response: AxiosResponse<any, any> = await clientAxios.get('services/specialtieswithprof');
  return response.data;
}

export const createService = async (data:any) => {
  try {
    const response: AxiosResponse<any, any> = await clientAxios.post('services',data);
    return response.status;
  } catch (error:any) {
    return error.response.data.statusCode;
  }
}

export const updateService = async (data:any) => {
  try {
    const response: AxiosResponse<any, any> = await clientAxios.put('services',data);
    return response.status;
  } catch (error:any) {
    return error.response.data.statusCode;
  }
}

export const deleteService = async (id:number) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clientAxios.delete('/services/'+id);
    return respuesta.status;
  } catch (error:any) {
    return error.response.data.statusCode;
  }
}

export const deleteAppointment = async (id:number) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clientAxios.delete('/services/appointments/'+id);
    return respuesta.status;
  } catch (error:any) {
    return error.response.data.statusCode;
  }
}