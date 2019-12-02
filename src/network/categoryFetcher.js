import { API_URL } from './api'

export const getAllCategory = (callback) => {
    fetch(API_URL + '/category', {
        method: 'GET',
        headers: {
            // "Authorization": 'Bearer ' + token,
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

export const editCategory = ({ categoryId, info }, callback) => {
    fetch(API_URL + `/category/${categoryId}`, {
        method: 'PUT',
        headers: {
            // "Authorization": 'Bearer ' + token,           
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

export const deleteAllCategory = (id, callback) => {
    fetch(API_URL + `/category/${id}`, {
        method: 'DELETE',
        headers: {
            // "Authorization": 'Bearer ' + token,
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