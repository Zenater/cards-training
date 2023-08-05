import {instance} from "./Instance/instance";
import {NewPasswordType, RequestType, SendMailType} from "../types/PasswordTypes";

export const passwordRecoveryAPI = {
    sendEmail(data: SendMailType) {
        return instance.post(`auth/forgot`, data)
    },
    sendNewPassword(data: NewPasswordType) {
        return instance.post<RequestType>(`auth/set-new-password`, data)
    },
}


