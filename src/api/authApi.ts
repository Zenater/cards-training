import {instance} from "./Instance/instance";
import {LoginParamsType, ProfileType} from "../types/AuthTypes";

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ProfileType>(`/auth/login`, data)
    },
    register(data: LoginParamsType) {
        return instance.post<LoginParamsType>(`/auth/register`, data)
    },
    me() {
        return instance.post(`/auth/me`)
    },
    logout() {
        return instance.delete(`/auth/me`)
    },
}






