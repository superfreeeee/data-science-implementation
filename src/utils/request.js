import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '': 'http://localhost:8080',
  withCredentials: true,
  timeout: 3 * 1000
})

service.interceptors.request.use(config => {
 
   config.data = JSON.stringify(config.data); 
   config.headers = {
     'Content-Type':'application/x-www-form-urlencoded' 
   }
 
   const token = getCookie('??');
   if(token){
      config.params = {'token':token} 
      config.headers.token= token; 
    }
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(response => {
 
  
  return response
}, error => {
   
  if (error && error.response) {
   
    switch (error.response.status) {
      case 400:
        error.message = '????'
        break;
      case 401:
        error.message = '?????????'
        break;
      case 403:
        error.message = '????'
        break;
      case 404:
        error.message = '????,??????'
        window.location.href = "/NotFound"
        break;
      case 405:
        error.message = '???????'
        break;
      case 408:
        error.message = '????'
        break;
      case 500:
        error.message = '??????'
        break;
      case 501:
        error.message = '?????'
        break;
      case 502:
        error.message = '????'
        break;
      case 503:
        error.message = '?????'
        break;
      case 504:
        error.message = '????'
        break;
      case 505:
        error.message = 'http????????'
        break;
      default:
        error.message = `????${error.response.status}`
    }
  } else {
    
    if (JSON.stringify(error).includes('timeout')) {
    }
    error.message('???????')
  } 
})
export default service