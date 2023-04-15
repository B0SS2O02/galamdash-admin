import axios from "axios"
import setting from './setting.json'
let token = `Bearer ${localStorage.token}`

const get = async (url, config = {}) => {
    if (!config.headers) {
        config['headers'] = {}
    }
    config['headers']['Authorization'] = token
    return await axios.get(setting.IP + url, config)
        .catch(err => {
            if(err.response.status==503){
                localStorage.clear()
                document.location.reload()
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
    return await axios.post(setting.IP + url, body, config)
}

export {
    get,
    post,
    push,
    put,
    del
}