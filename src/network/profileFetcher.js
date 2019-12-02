import { API_URL } from './api'

export const getAllProfile = (callback) => {
    fetch(API_URL + '/profile', {
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

export const deleteAllProfile = (info, callback) => {
    fetch(API_URL + `/profile/${info.id}`, {
        method: 'DELETE',
        headers: {
            // "Authorization": 'Bearer ' + info.token,
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