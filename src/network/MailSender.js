 import { API_URL } from './api'

export const mailSender = ({info}, callback) => {
    console.log({info})
    fetch(API_URL + '/mail', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        cache: 'no-cache',
        body: JSON.stringify({ info })
    })
        .then(res => {
            if (res.status !== 200) throw res.json()
            else return res.json()
        })
        .then(data => {
            console.log(data)
            callback(null, data)
        })
        .catch(error => callback(null, error))
}