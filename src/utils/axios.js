import axios from 'axios';
import qs from 'querystring';

let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;

axios.interceptors.request.use(config => {
  //发起请求时，取消掉当前正在进行的相同请求
  console.log('显示loading')
  if (promiseArr[config.url]) {
      promiseArr[config.url]('操作取消')
      promiseArr[config.url] = cancel
  } else {
      promiseArr[config.url] = cancel
  }
  return config
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {
  console.log('隐藏loading')
  return response
}, err => {
  return Promise.resolve(err.response)
});

axios.defaults.baseURL = '/maoyan';

//设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.timeout = 10000;

export default {
  //get请求
    get (url, param) {
      axios({method: 'get', url, params: qs.stringify(param), 
      cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    },
  //post请求
    post (url, param) {
      return new Promise((resolve,reject) => {
        axios({
          method: 'post',
          url,
          data: param,
          cancelToken: new CancelToken(c => {
            cancel = c;
          })
        }).then(res => {
          resolve(res);
        })
      })
     }
  }
