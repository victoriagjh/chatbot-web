import axios from "axios";


const axiosInstance = axios.create({
  baseURL: process.env.REACT_PUBLIC_API_HOST,
  responseType: "json",
});


export async function apiGet(url: string, params = {}, options = {}) {
  return await axiosInstance.get(url, { params: params, ...options });
}

export async function apiPost(url: string, data = {}, options = {}) {
  return await axiosInstance.post(url, data, options);
}
