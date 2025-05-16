import type { AxiosInstance } from 'axios';
import axios from 'axios';

interface ExtendedAxiosInstance extends AxiosInstance {
    all<T = any>(...requests: Promise<any>[]): Promise<T[]>
}

const httpClient = axios.create({
    // baseURL: '/api', // your base URL
    headers: {
        'Content-Type': 'application/json',
    },
}) as ExtendedAxiosInstance;

// Store active Requests with their controllers
// So in future using this we can abort them
const activeRequests = new Map();

httpClient.interceptors.request.use(function (config) {
    // Add auth tokens or logs here
    const controller = new AbortController();
    config.signal = controller.signal

    if (config?.url) {
        activeRequests.set(config.url, controller)
    }

    return {
        ...config,
    }
}, function (error) {
    return Promise.reject(error)
})

httpClient.interceptors.response.use(function (response) {
    if (response?.config?.url) {
        activeRequests.delete(response.config.url)
    }

    return response;
}, function (error) {
    if (error?.config?.url) {
        activeRequests.delete(error.config.url)
    }
    return Promise.reject(error)
})

httpClient.all = function <T = any>(...requests: Promise<any>[]) {
    return axios.all(requests) as Promise<T[]>
}


export default httpClient;