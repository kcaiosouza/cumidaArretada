import axios from 'axios';
import { parseCookies } from 'nookies';

const { "CumidaArretada.AuthToken" : authToken } = parseCookies();

export const api = axios.create({
    baseURL: process.env.API_URL || "https://93ef-2804-29b8-507a-750f-2e94-dd8f-b268-c2f2.ngrok-free.app/api/v0.1"
})

if(authToken) {
    api.defaults.headers['Authorization'] = `Bearer ${authToken}`
}