import axios from 'axios';
import { parseCookies } from 'nookies';

const { "CumidaArretada.AuthToken" : authToken } = parseCookies();

export const api = axios.create({
    baseURL: process.env.API_URL || "https://473e-2804-29b8-507a-5c7b-1be3-b4ac-664f-8a0c.ngrok-free.app/api/v0.1"
})

if(authToken) {
    api.defaults.headers['Authorization'] = `Bearer ${authToken}`
}