import {instance} from "./cardsApi";
import {ProfileType} from "./authApi";

export const profileApi = {
    changeName(name: string) {
        return instance.put<AnswerChangeProfileType>(`/auth/me`, { name})
    } ,
    changeAvatar( avatar: string) {
        return instance.put<AnswerChangeProfileType>(`/auth/me`, { avatar})
    }
}

export type AnswerChangeProfileType = {
    updatedUser: ProfileType
    error?:string
}