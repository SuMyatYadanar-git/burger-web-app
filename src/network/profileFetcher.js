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

export const addNewProfile = ({ info, token }, callback) => {
    fetch(API_URL + `/profile`, {
        method: 'POST',
        headers: {
            "Authorization": 'Bearer ' + token,
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

export const editProfile = ({ id, info, token }, callback) => {
    fetch(API_URL + `/profile/${id}`, {
        method: 'PUT',
        headers: {
            "Authorization": 'Bearer ' + token,
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

// export const deleteAllProfile = (id,token, callback) => {
//     fetch(API_URL + `/profile/${id}`, {
//         method: 'DELETE',
//         headers: {
//              "Authorization": 'Bearer ' + token,
//             "Content-Type": "application/json"
//         },
//         cache: 'no-cache'
//     })
//         .then(res => {
//             if (res.status !== 200) throw res.json()
//             else return res.json()
//         })
//         .then(data => {
//             callback(null, data)
//         })
//         .catch(error => callback(null, error))
// }
export const deleteAllProfile = (id, token, callback) => {
    fetch(API_URL + `/profile/delete-profile/${id}`, {
        method: 'PATCH',
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