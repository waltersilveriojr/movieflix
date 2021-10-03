const tokenKey = 'authData';

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    userId: number;
    userFistName: string;
}

export const saveAuthData = (obj: LoginResponse) => {
    localStorage.setItem('authData', JSON.stringify(obj));
}

export const getAuthData = () => {
    const str = localStorage.getItem(tokenKey) ?? "{}"
    return JSON.parse(str) as LoginResponse;
}

export const removeAuthData = () => {
    localStorage.removeItem(tokenKey);
}