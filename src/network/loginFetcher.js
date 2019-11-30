import { API_URL } from './api'

export const loginFetcher = (info, callback) => {

    const user_name = info.name
    const pwd = info.pwd
    fetch(API_URL + '/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        cache: 'no-cache',
        body: JSON.stringify({ user_name, pwd })

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

// export const GetloginData = (id, callback) => {

//     fetch(API_URL + `/user/${id}`, {
//         method: 'GET',
//         headers: {
//             // "Authorization": 'Bearer ' + token,
//             "Content-Type": "application/json"
//         },
//         cache: 'no-cache'
//     })
//         .then(res => {
//             if (res.status !== 200) throw res.json()
//             else return res.json()
//         })
//         .then(data => {
//             callback(null, data.payload)
//         })
//         .catch(error => callback(null, error))

// }

// export const changePwd = (info, callback) => {
//     fetch(API_URL + '/login/change-pwd', {
//         method: 'PATCH',
//         headers: {
//             "Conent-Type": "application/json"
//         },
//         cache: 'no-cache'
//     })
//         .then(res => {
//             if (res.status !== 200) throw res.json()
//             else return res.json()
//         })
//         .then(data => {
//             // console.log(data)
//             callback(null, data)
//         })
//         .then(error => callback(null, error))
// }