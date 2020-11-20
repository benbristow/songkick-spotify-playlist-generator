const jwtTokenKey = "jwt_token";

export const SetJwtToken = (token) => {
    window.sessionStorage.setItem(jwtTokenKey, token);
}

export const GetJwtToken = () => {
    return window.sessionStorage.getItem(jwtTokenKey);
}

export const IsAuthenticated = () => {
    return Boolean(GetJwtToken());
}

export const DeleteJwtToken = () => {
    return window.sessionStorage.removeItem(jwtTokenKey);
}
