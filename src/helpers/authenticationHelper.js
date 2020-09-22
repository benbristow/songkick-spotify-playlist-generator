const jwtTokenKey = "jwt_token";

export const setJwtToken = (token) => {
    window.sessionStorage.setItem(jwtTokenKey, token);
}

export const getJwtToken = () => {
    return window.sessionStorage.getItem(jwtTokenKey);
}

export const authenticated = () => {
    return Boolean(getJwtToken());
}

export const deleteJwtToken = () => {
    return window.sessionStorage.removeItem(jwtTokenKey);
}
