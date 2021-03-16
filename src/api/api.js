import http from '../utils/http'

let request = '/api'

export default{
    getListAPI(params){
        return http.get(`${request}`, params)
    },

    postFormAPI(params){
        return http.post(`${request}`, params)
    }
}