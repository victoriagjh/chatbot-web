import { AuthData } from "../schemas/Auth";

const AUTH_KEY = 'AUTH_DATA';

export const saveAuthData = (authData: AuthData) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
};

export const getAuthData = (): AuthData | null => {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) as AuthData : null;
};

export const removeAuthData = () => {
    localStorage.removeItem(AUTH_KEY);
};
