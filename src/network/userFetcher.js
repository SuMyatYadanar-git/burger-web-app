const { API_URL } = require('./api')

export const changePwd = (info, callback) => {
   
    const pwd = info.Npwd
    const id = info.id
    fetch(API_URL + '/user/change-pwd', {
        method: 'PATCH',
        headers: {
            "Authorization": 'Bearer ' + info.token,
            "Content-Type": "application/json"
        },
        cache: 'no-cache',
        body: JSON.stringify({ pwd, id })
    })
        .then(res => {
            if (res.status !== 200) throw res.json()
            else return res.json()
        })
        .then(data => {
             console.log(data)
            callback(null, data)
        })
        .then(error => callback(null, error))
}

export const GetloginData = (id, callback) => {
    fetch(API_URL + `/user/${id}`, {
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
        .then(data => {
            callback(null, data.payload)
        })
        .catch(error => callback(null, error))

}