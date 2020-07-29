import axios from 'axios';
// axios.defaults.timeout = 8000;

// axios.defaults.baseURL = 'http://192.168.10.242:8082/act' //测试
// axios.defaults.baseURL = 'http://act.jiangjuncj.com/#/act/egg/smash' //
// axios.defaults.baseURL = 'http://tstock.jiangjuncj.com' //预生产
// axios.defaults.baseURL = 'http://stock.jiangjuncj.com' //生产
// axios.defaults.baseURL = 'http://app.jiangjunzx.com'
// axios.defaults.baseURL = 'http://192.168.10.242:8081'
   axios.defaults.baseURL = 'https://app.jiangjuncj.com'

// request拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})


//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


import Vue from 'vue'



export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

Vue.prototype.$post = post
