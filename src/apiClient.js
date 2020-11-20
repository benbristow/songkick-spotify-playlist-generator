import axios from 'axios';

import config from './config';

import { GetJwtToken } from "./helpers/authenticationHelper";

const instance = axios.create({
    baseURL: config.apiUrl
});

const GetAuthenticationHeaders = () => ({
    "Access-Token": GetJwtToken()
})

export const getAuthenticateUrl = async () => {
    const response = await instance.get('/Authenticate');
    return response.data.url;
}

export const createPlaylist = async (username) => {
    const response = await instance.post('/CreatePlaylist', { username }, { headers: GetAuthenticationHeaders() });
    return response;
}