import { getHeadersConfiguration } from "../utils/httpUtils"

const USER_URL = "api/user"

export const getCurrentUser = async() => {
    const headers = getHeadersConfiguration()

    return await fetch(`${USER_URL}/current`, { headers })
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}


export const uploadProfileImage = async(image) => {
    const formData = new FormData()

    formData.append("image", image)

    return await fetch(`${USER_URL}/upload`, {method: 'POST', body: formData})
        .then(res => res.json())
        .catch(err => err)
}

export const updateProfile = async(request, id) => {
    const headers = getHeadersConfiguration()

    return await fetch(`${USER_URL}/${id}`, {method: "PUT", headers, body: JSON.stringify(request)})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const updatePassword = async(request) => {
    const headers = getHeadersConfiguration()

    return await fetch(`${USER_URL}/edit-password`, {method: "PUT", headers, body: JSON.stringify(request)})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}