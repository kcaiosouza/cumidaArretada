import axios from 'axios';
import { parseCookies } from 'nookies';

const { "CumidaArretada.AuthToken" : authToken } = parseCookies();

export const api = axios.create({
    baseURL: process.env.API_URL || "http://localhost:3333/api/v0.1"
})

if(authToken) {
    api.defaults.headers['Authorization'] = `Bearer ${authToken}`
}