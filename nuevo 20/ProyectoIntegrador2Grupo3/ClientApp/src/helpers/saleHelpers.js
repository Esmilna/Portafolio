import { getHeadersConfiguration } from "../utils/httpUtils"

const SALE_URL = "api/sale"

export const sendOrder = async(request) => {
    const headers = getHeadersConfiguration()

    return await fetch(SALE_URL, { headers, method: "POST", body: JSON.stringify(request) })
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const getOrders = async() => {
    const headers = getHeadersConfiguration()

    return await fetch(SALE_URL, {headers})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const getCurrentOrder = async(id) => {
    const headers = getHeadersConfiguration()

    return await fetch(`${SALE_URL}/${id}`, {headers})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const getAllOrders = async() => {
    const headers = getHeadersConfiguration()

    return await fetch(`${SALE_URL}/admin`, {headers})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const updateOrder = async(id, request) => {
    const headers = getHeadersConfiguration()

    console.log(request)
    return await fetch(`${SALE_URL}/admin/${id}`, {headers, method: "PUT", body: JSON.stringify(request)})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}