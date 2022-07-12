import axios from 'axios'

let requests = axios.create({
  baseURL: "/mock",
  timeout: 5000,
});

//请求拦截器
requests.interceptors.request.use((config) => {
  return config;
});

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error)=>{
    return Promise.reject(new Error('faile'))
  }
);
export default requests;