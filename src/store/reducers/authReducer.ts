import {setAppError, setAppIsInitialized, setAppStatus} from "./appReducer";
import {AppThunk} from "../store";
import {handleServerAppError} from "../../utils/error-utils";
import {getProfileDataAC} from "./profileReducer";
import {Dispatch} from "redux";
import {LoginParamsType, ProfileType} from "../../types/AuthTypes";
import {authAPI} from "../../api/authApi";

export type ProfileInitialStateType = {
    profile: ProfileType
    myId: string | null
    isLoggedIn: boolean
    registrationError: string | null
    isRegistration: boolean
}
const initialState: ProfileInitialStateType = {
    isLoggedIn: false,
    profile: {
        _id: "" as string,
        email: null,
        name: null,
        avatar: null,
        publicCardPacksCount: null,
        created: null,
        updated: null,
        isAdmin: null,
        verified: null,
        rememberMe: null,
        error: null,
    },
    myId: "" as string | null,
    registrationError: null,
    isRegistration: false
}

export const authReducer = (state = initialState, action: AuthActionsType): ProfileInitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'LOGIN/SET-MY-ID':
            return {...state, myId: action.myId}
        case 'LOGIN/REGISTRATION-ERROR':
            return {...state, registrationError: action.error}
        case "LOGIN/SIGN-UP":
            return {...state, isRegistration: action.isRegistration}
        default:
            return state
    }
}
// actions
export const setIsLoggedIn = (value: boolean) => ({type: 'LOGIN/SET-IS-LOGGED-IN', value} as const)
export const setIdProfile = (myId: string | null) => ({type: 'LOGIN/SET-MY-ID', myId} as const)
export const setServerError = (error: string | null) => ({type: 'LOGIN/REGISTRATION-ERROR', error} as const)
export const signUp = (isRegistration: boolean) => ({type: 'LOGIN/SIGN-UP', isRegistration} as const)

// thunks
export const loginTC = (data: LoginParamsType): AppThunk => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        let res = await authAPI.login(data)
        dispatch(setIsLoggedIn(true))
        dispatch(getProfileDataAC(res.data))
        dispatch(setAppStatus('succeeded'))
        dispatch(setIdProfile(res.data._id))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}
export const logoutTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        await authAPI.logout()
        dispatch(setIsLoggedIn(false))
        dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}
export const registerTC = (data: LoginParamsType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        await authAPI.register(data)
        dispatch(signUp(true))
        dispatch(setAppStatus('succeeded'))
        alert('success!')
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}

// types
export type AuthActionsType =
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppIsInitialized>
    | ReturnType<typeof setServerError>
    | ReturnType<typeof setIdProfile>
    | ReturnType<typeof signUp>

