import { getHeadersConfiguration } from "../utils/httpUtils"

const CAR_URL = "api/car"
const MODEL_URL = "api/model"
const BRAND_URL = "api/brand"
const CART_URL = "api/cart"

/***********Car************/

export const getCars = async(query) => {
    const headers = getHeadersConfiguration()
    let url = `${CAR_URL}/admin/search`

    if(query) url+= "/" + query

    return await fetch(url, { headers })
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const getCarByID = async(id) => {
    const headers = getHeadersConfiguration()

    return await fetch(`${CAR_URL}/${id}`, { headers })
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const fetchCarAndModelData = async(carId) => {
    const headers = getHeadersConfiguration()

    return await Promise.all(
        [
            fetch(`${CAR_URL}/${carId}`, { headers }),
            fetch(MODEL_URL, { headers })
        ]
    ).then(responses => Promise.all(responses.map(res => res.json())))
     .then(data => {
        const [data1, data2] = data;

        return {
            car: data1,
            model: data2
        }
    })
      .catch(err => err)
}

export const createCar = async(request) => {
    const headers = getHeadersConfiguration()

    return await fetch(CAR_URL, {method: "POST", headers, body: JSON.stringify(request)})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const editCar = async(request, id) => {
    const headers = getHeadersConfiguration()

    return await fetch(`${CAR_URL}/${id}`, {method: "PUT", headers, body: JSON.stringify(request)})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const deleteCar = async(id) => {
    const headers = getHeadersConfiguration()

    return await fetch(`${CAR_URL}/${id}`, {method: "DELETE", headers})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const uploadCarImage = async(image) => {
    const formData = new FormData()

    formData.append("image", image)


    return await fetch(`${CAR_URL}/upload`, {method: 'POST', body: formData})
        .then(res => res.json())
        .catch(err => err)
}

export const searchCars = async(searchParams) => {
    let url = `${CAR_URL}/search`

    if(searchParams) url+="/" + searchParams

    return await fetch(url)
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

/***********Models************/
export const createModel = async(request) => {
    const headers = getHeadersConfiguration()

    return await fetch(MODEL_URL, {method: "POST", headers, body: JSON.stringify(request)})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const getModels = async() => {
    const headers = getHeadersConfiguration()

    return await fetch(MODEL_URL, { headers })
        .then(res => res.json())
        .then(data => data["$values"])
        .catch(err => err)
}

export const getModelByID = async(id) => {
    const headers = getHeadersConfiguration()

    return await fetch(`${MODEL_URL}/${id}`, { headers })
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const searchModels = async(query) => {
    const headers = getHeadersConfiguration()
    
    if(!query) return await getModels()

    return await fetch(`${MODEL_URL}/search/${query}`, { headers })
    .then(res => res.json())
    .then(data => data["$values"])
    .catch(err => err)
}

export const editModel = async(request, id) => {
    const headers = getHeadersConfiguration()

    return await fetch(`${MODEL_URL}/${id}`, {method: "PUT", headers, body: JSON.stringify(request)})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const deleteModel = async(id) => {
    const headers = getHeadersConfiguration()

    return await fetch(`${MODEL_URL}/${id}`, {method: "DELETE", headers})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}


export const fetchCurrentModelAndBrandsData = async(modelId) => {
    const headers = getHeadersConfiguration()

    return await Promise.all(
        [
            fetch(`${MODEL_URL}/${modelId}`, { headers }),
            fetch(BRAND_URL, { headers })
        ]
    ).then(responses => Promise.all(responses.map(res => res.json())))
     .then(data => {
        const [data1, data2] = data;

        return {
            ...data1,
            brands: data2
        }
    })
      .catch(err => console.logerr)
}

/*********Brands**********/

export const createBrand = async(request) => {
    const headers = getHeadersConfiguration()

    return await fetch(BRAND_URL, {method: "POST", headers, body: JSON.stringify(request)})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const getBrands = async() => {
    const headers = getHeadersConfiguration()

    return await fetch(BRAND_URL, { headers })
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const getBrandByID = async(id) => {
    const headers = getHeadersConfiguration()

    return await fetch(`${BRAND_URL}/${id}`, { headers })
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const editBrand = async(request, id) => {
    const headers = getHeadersConfiguration()

    return await fetch(`${BRAND_URL}/${id}`, {method: "PUT", headers, body: JSON.stringify(request)})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}

export const deleteBrand = async(id) => {
    const headers = getHeadersConfiguration()

    return await fetch(`${BRAND_URL}/${id}`, {method: "DELETE", headers})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}


export const addProductToCart = async(request) => {

    return await fetch(`${CART_URL}`, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(request)})
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
}