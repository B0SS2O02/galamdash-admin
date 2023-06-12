import axios from "axios"
import setting from './setting.json'
import Cookie from 'universal-cookie'
const cookie = new Cookie()
let token = cookie.get('token')

const get = async (url, config = {}) => {
    if (!config.headers) {
        config['headers'] = {}
    }
    config['headers']['Authorization'] = token

    return await axios.get(setting.IP + url, config)
        .catch(err => {
            if (!!err.response.status) {
                if (err.response.status == 503 || err.response.status == 403) {
                    localStorage.clear()
                    document.location.reload()
                }
            }
        })
}
const put = async (url, body = {}, config = {}) => {
    if (!config.headers) {
        config['headers'] = {}
    }
    config['headers']['Authorization'] = token
    return await axios.put(setting.IP + url, body, config)
}
const push = async (url, body = {}, config = {}) => {
    if (!config.headers) {
        config['headers'] = {}
    }
    config['headers']['Authorization'] = token
    return await axios.push(setting.IP + url, body, config)
}
const del = async (url, config = {}) => {
    if (!config.headers) {
        config['headers'] = {}
    }
    config['headers']['Authorization'] = token
    return await axios.delete(setting.IP + url, config)
}
const post = async (url, body = {}, config = {}) => {
    if (!config.headers) {
        config['headers'] = {}
    }
    config['headers']['Authorization'] = token
    let result
    await axios.post(setting.IP + url, body, config)
        .then((response) => { result = response })
        .catch((err) => { result = err.response })
    return result
}

export {
    get,
    post,
    push,
    put,
    del
}