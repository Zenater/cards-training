import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})


export const passwordRecoveryAPI = {
    sendEmail(data: SendMailType) {
        return instance.post(`auth/forgot`, data)
    },
    sendNewPassword(data: NewPasswordType) {
        return instance.post<RequestType>(`auth/set-new-password`, data)
    }
}

export type SendMailType = {
    email: string
    from: string
    message: string
}

export type RequestType = {
    info: string
    error: string;
}
export type NewPasswordType = {
    password?: string
    resetPasswordToken?: string | undefined
}
