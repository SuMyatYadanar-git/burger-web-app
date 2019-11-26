import { API_URL } from './api'

export const loginFetcher = (info, callback) => {
    fetch(API_URL +'/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        cache: 'no-cache',
        body: JSON.stringify({ info })

    })
        .then(res => {
            if (res.status !== 200) throw res.json()
            else return res.json()
        })
        .then(data => {
            callback(null,data)
        })
        .catch(error => callback(null,error))
}