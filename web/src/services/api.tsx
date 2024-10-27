import axios from 'axios';
import { parseCookies } from 'nookies';

const { "CumidaArretada.AuthToken" : authToken } = parseCookies();

export const api = axios.create({
    baseURL: process.env.API_URL || "https://0bf6-2804-29b8-507a-750f-d55-a521-4644-7b79.ngrok-free.app/api/v0.1"
})

if(authToken) {
    api.defaults.headers['Authorization'] = `Bearer ${authToken}`
}