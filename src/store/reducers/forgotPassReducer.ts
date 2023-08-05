import {setAppStatus} from "./appReducer";
import {AppThunk} from "../store";
import {handleServerAppError} from "../../utils/error-utils";
import {passwordRecoveryAPI} from "../../api/passwordApi";
import {NewPasswordType, SendMailType} from "../../types/PasswordTypes";

const initialState = {
    data: {
        email: '',
        from: '',
        message: '',
    } as SendMailType,
    recoverySuccess: '',
    successMessage: '',
    email: ''
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

export const setSuccess = (data: SendMailType) => ({type: 'PASSWORD/SET_SUCCESS', data} as const)
export const setEmail = (email: string) => ({type: 'PASSWORD/SEND-EMAIL', email} as const)
export const setNewPassword = (successMessage: string) => ({
    type: 'PASSWORD/SEND-NEW-PASSWORD',
    successMessage
} as const)

export const sendEmailTC = (data: SendMailType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        let res = await passwordRecoveryAPI.sendEmail(data)
        dispatch(setAppStatus('succeeded'))
        dispatch(setSuccess(res.data))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}
export const sendNewPasswordTC = (data: NewPasswordType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        let res = await passwordRecoveryAPI.sendNewPassword(data)
        dispatch(setAppStatus('succeeded'))
        dispatch(setNewPassword(res.data.info))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}

export type ForgotPasswordActionsType = ReturnType<typeof setSuccess> | ReturnType<typeof setNewPassword>
    | ReturnType<typeof setEmail>