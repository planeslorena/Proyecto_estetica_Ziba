'use client'
import axios from 'axios';

const createClient = () => {
  const client = axios.create({
    baseURL: 'http://localhost:8080/'
  });
  return client;
}
const clientAxios = createClient();
export default clientAxios;

//crea un interceptor de la request, cuando se envia una request con el clientAxios chequea si hay token y lo agrega en los headers
clientAxios.interceptors.request.use((request) => {
  if (sessionStorage.getItem("accessToken")) {
    request.headers.Authorization = `Bearer ${sessionStorage.getItem("accessToken")}`;
  }
  return request;
})

/*export const setAuthToken = (token:any) => {
  if (token) {
      // Si hay token vigente lo carga en los headers
      clientAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
      // Borra header de autorización
      delete clientAxios.defaults.headers.common['Authorization'];
  }
};
*/

/*
clienteAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === 'Network Error' && !error.response) {
      return Promise.reject('axios.errors.network');
    }
    const { status } = error.response;

    if (status === 400) {
      if (error.response.data.errors) {
        return Promise.reject(error.response.data.errors[0].msg);
      }
      return Promise.reject(error.response.data.msg);
    }
    if (status === 401) {
      return Promise.reject('axios.errors.unauthorized');
    }
    if (status === 404) {
      return Promise.reject('axios.errors.resourceNotFound');
    }
    if (status === 500) {
      return Promise.reject('axios.errors.server');
    }
    return null;
  }
);*/

