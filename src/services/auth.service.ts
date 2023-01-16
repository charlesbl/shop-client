import axios, { AxiosResponse } from "axios";

const http = axios.create({
    baseURL: "http://localhost:3001/"
});

const signup = (username: string, password: string) => {
    return http.post('/users/signup', { username, password })
}

const login = async (username: string, password: string): Promise<AxiosResponse<any, any>> => {
    return http.post('/auth/login', { username, password })
}

const authService = {
    signup,
    login
};

export default authService;