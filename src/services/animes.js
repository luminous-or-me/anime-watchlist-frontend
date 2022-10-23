import axios from "axios"

const baseUrl = '/api/anime'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, changedObject) => {
    const request = axios.put(`${baseUrl}/${id}`, changedObject)
    return request.then(response => response.data)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    remove: remove,
    setToken: setToken
}