import axios from "axios"

const baseUrl = '/api/anime'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
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
    remove: remove
}