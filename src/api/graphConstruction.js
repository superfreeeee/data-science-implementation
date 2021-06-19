import http from '../utils/http'

const api={
    constructionPre:'/api/graph'
}

export function constructGraphAPI(params) {
    return http.get(`${api.constructionPre}/constructGraph`,params)
}
export function getConstructionDetailAPI(){
    return http.get(`${api.constructionPre}/getConstructionDetail`)
}
export function stopConstructionAPI(){
    return http.get(`${api.constructionPre}/stopConstruction`)
}
export function getGraphByIdAPI(){
    return http.get(`${api.constructionPre}/getConstructionGraph`)
}