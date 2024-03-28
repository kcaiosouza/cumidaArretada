import axios from 'axios';
import { parseCookies } from 'nookies';

const { "CumidaArretada.AuthToken" : authToken } = parseCookies();

export const api = axios.create({
    baseURL: process.env.API_URL || "http://localhost:3333"
})

if(authToken) {
    api.defaults.headers['Authorization'] = `Bearer ${authToken}`
}