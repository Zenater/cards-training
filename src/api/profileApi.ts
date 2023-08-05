import {instance} from "./Instance/instance";
import {AnswerChangeProfileType} from "../types/ProfileTypes";

export const profileApi = {
    changeName(name: string) {
        return instance.put<AnswerChangeProfileType>(`/auth/me`, {name})
    },
    changeAvatar(avatar: string) {
        return instance.put<AnswerChangeProfileType>(`/auth/me`, {avatar})
    },
}

