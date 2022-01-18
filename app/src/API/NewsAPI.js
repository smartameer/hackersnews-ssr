import axios from 'axios'

import * as Endpoints from '../Entities/Endpoints'

export const API = url => axios.create({
    baseURL: url,
    headers: {
        'Accept-Language': 'en-US'
    }
})

export const fetchNews = ({ page }) =>
    API(Endpoints.API_ENDPOINT)
        .get(Endpoints.GET_NEWS + `?hitsPerPage=30&page=${page}`)
        .then(response => response)
        .catch(err => ({ err }))
