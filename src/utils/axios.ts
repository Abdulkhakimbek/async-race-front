import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });
  return { data: res.data, totalCount: res?.headers['x-total-count'] };
};

// ----------------------------------------------------------------------

export const poster = async (args: string | [string, any]) => {
  const [url, data] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.post(url, data);
  return { data: res.data };
};

// ----------------------------------------------------------------------

export const updater = async (args: string | [string, any]) => {
  const [url, data] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.put(url, data);
  return { data: res.data };
};

// ----------------------------------------------------------------------

export const endpoints = {
  car: {
    list: '/garage',
    details: '/garage',
  },
  winners: {
    list: '/winners',
    details: '/winners', // by /winners/:id
  },
};
