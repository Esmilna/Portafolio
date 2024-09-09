import { getHeadersConfiguration } from "../utils/httpUtils"

const CLIENT_URL = "api/client"

export const getClients = async(query) => {
    const headers = getHeadersConfiguration()

    let url = CLIENT_URL

    if(query) url+="/search/" + query

    return await fetch(url, { headers })
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const getClientById = async(id) => {
    const headers = getHeadersConfiguration()

    return await fetch(`${CLIENT_URL}/${id}`, { headers })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.error(err))
}

export const editClient = async(id, body) => {
    const headers = getHeadersConfiguration()

    return await fetch(`${CLIENT_URL}/${id}`, {method: "PUT", headers, body: JSON.stringify(body)})
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.error(err))
}

export const deleteClient = async(id) => {
    const headers = getHeadersConfiguration()

    return await fetch(`${CLIENT_URL}/${id}`, {method: "DELETE", headers})
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.error(err))
}