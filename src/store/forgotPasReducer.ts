import {NewPasswordType, passwordRecoveryAPI, SendMailType} from "../components/api/passwordApi";
import {setAppStatusAC} from "./appReducer";
import {AppThunk} from "./store";
import {handleServerAppError} from "../utils/error-utils";
import {AxiosError} from "axios";

const initialState = {
    data: {
        email: '',
        from: '',
        message: '',
    } as SendMailType,
    recoverySuccess: '',
    successMessage: '',
    email:''
}

export type InitialStateType = typeof initialState

export const forgotPasswordReducer = (state = initialState, action: ForgotPasswordActionsType): InitialStateType => {
    switch (action.type) {
        case 'PASSWORD/SET_SUCCESS':
            return {...state, data: action.data}
        case 'PASSWORD/SEND-NEW-PASSWORD':
            return {...state, successMessage: action.successMessage}
        case 'PASSWORD/SEND-EMAIL':
            return {...state, email: action.email}
        default:
            return state
    }
};

export const setSuccessAC = (data: SendMailType) => ({type: 'PASSWORD/SET_SUCCESS', data} as const)
export const setEmailsAC = (email: string) => ({type: 'PASSWORD/SEND-EMAIL', email} as const)
export const setNewPasswordAC = (successMessage: string) => ({type: 'PASSWORD/SEND-NEW-PASSWORD',
    successMessage} as const)


export const sendEmailTC = (data: SendMailType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        let res = await passwordRecoveryAPI.sendEmail(data)
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setSuccessAC(res.data))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
export const sendNewPasswordTC = (data: NewPasswordType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        let res = await passwordRecoveryAPI.sendNewPassword(data)
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setNewPasswordAC(res.data.info))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}


export type ForgotPasswordActionsType = ReturnType<typeof setSuccessAC> | ReturnType<typeof setNewPasswordAC>
|ReturnType<typeof setEmailsAC>