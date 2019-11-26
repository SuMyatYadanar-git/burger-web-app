import { API_URL } from './api'

export const getAllProfile = (callback) => {
    fetch(API_URL + '/profile', {
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