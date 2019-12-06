import { API_URL } from './api'

export const getAllProduct = (callback) => {
    fetch(API_URL + '/product', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        cache: 'no-cache'
    })
        .then(res => {
            if (res.status !== 200) throw res.json()
            else return res.json()
        })
        .then(payload => {
            callback(null, payload.payload)
        })
        .catch(error => callback(null, error))
}
export const addNewProduct =({info,token},callback)=>{
    fetch(API_URL + `/product`,{
      method:'POST',
      headers:{
            "Authorization": 'Bearer ' + token, 
      },
      cache:'no-cache',
      body:info
    })
    .then(res=>{
        if(res.status !== 200) throw res.json()
        else return res.json()
    })
    .then(data => {
        callback(null, data)
    })
    .catch(error => callback(null, error))
}

export const editProduct = ({ id, info,token }, callback) => {
    
    fetch(API_URL + `/product/${id}`, {
        method: 'PUT',
        headers: {
               "Authorization": 'Bearer ' + token,
            // "Content-Type": "application/json"
        },
        cache: 'no-cache',
        body: info
    })
        .then(res => {
            if (res.status !== 200) throw res.json()
            else return res.json()
        })
        .then(data => {
            callback(null, data)
        })
        .catch(error => callback(null, error))
}

export const deleteAllProduct = (id,token, callback) => {
    fetch(API_URL + `/product/${id}`, {
        method: 'DELETE',
        headers: {
               "Authorization": 'Bearer ' + token,
            "Content-Type": "application/json"
        },
        cache: 'no-cache'
    })
        .then(res => {
            if (res.status !== 200) throw res.json()
            else return res.json()
        })
        .then(data => {
            callback(null, data)
        })
        .catch(error => callback(null, error))
}