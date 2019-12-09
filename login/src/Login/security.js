import axios from 'axios'
import { serverUrl } from './baseRoute';

const axiosCustom = axios.create()

export const setAuthHeader = (token) =>
{
    axiosCustom.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

setAuthHeader(localStorage.getItem('i4F2H1u1R'))

export { axiosCustom};