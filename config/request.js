import axios from 'axios'

export const $POST = (url,data) =>{
  return axios({
    method: 'post',
    url,
    data,
    withCredentials: true,
    // header: { 'Access-Control-Allow-Origin': '*' },
  })
}

export const $GET  = (url) =>{
  return axios({
    method: 'get',
    url,
    withCredentials: true,
    // header: { 'Access-Control-Allow-Origin': '*' },
  })
}