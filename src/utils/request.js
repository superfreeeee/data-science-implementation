import axios from 'axios';

const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'http://42.192.9.211:9090/coin'
      : 'http://42.192.9.211:9090/coin',
  withCredentials: true,
  timeout: 30 * 1000, // 30s
});

request.interceptors.request.use(
  (config) => {
    // config.data = JSON.stringify(config.data)
    // config.headers = {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }

    // const token = getCookie('??')
    // if (token) {
    //   config.params = { 'token': token }
    //   config.headers.token = token
    // }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    // if (error && error.response) {
    //   switch (error.response.status) {
    //     case 400:
    //       error.message = '????'
    //       break
    //     ...
    //   }
    // } else {
    //   if (JSON.stringify(error).includes('timeout')) {
    //   }
    //   console.log(error.response.status)
    //   error.message('???????')
    // }
    return Promise.reject(error);
  }
);
export default request;
