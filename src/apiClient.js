import axios from 'axios';

import config from './config';

import { getJwtToken } from "./helpers/authenticationHelper";

const instance = axios.create({
    baseURL: config.apiUrl
});

const getAuthenticationHeaders = () => ({
    Token: getJwtToken()
})

export const getAuthenticateUrl = async () => {
    const response = await instance.get('/Authenticate');
    return response.data.url;
}

export const createPlaylist = async (username) => {
    const response = await instance.post('/CreatePlaylist', { username }, { headers: getAuthenticationHeaders() });
    return response;
}