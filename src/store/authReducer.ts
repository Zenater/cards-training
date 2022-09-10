import {authAPI, LoginParamsType, ProfileType} from "../api/authApi";
import {setAppErrorAC, setAppIsInitializedAC, setAppStatusAC} from "./appReducer";
import {AppThunk} from "./store";
import {handleServerAppError} from "../utils/error-utils";
import {getProfileDataAC} from "./profileReducer";
import {Dispatch} from "redux";

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
export const setIsLoggedInAC = (value: boolean) => ({type: 'LOGIN/SET-IS-LOGGED-IN', value} as const)
export const setIdProfileAC = (myId: string | null) => ({type: 'LOGIN/SET-MY-ID', myId} as const)
export const setServerErrorAC = (error: string | null) => ({type: 'LOGIN/REGISTRATION-ERROR', error} as const)
export const signUpAC = (isRegistration: boolean) => ({type: 'LOGIN/SIGN-UP', isRegistration} as const)

// thunks
export const loginTC = (data: LoginParamsType): AppThunk => async (dispatch: Dispatch) => {
    try{
        dispatch(setAppStatusAC('loading'))
        let res = await authAPI.login(data)
        dispatch(setIsLoggedInAC(true))
        dispatch(getProfileDataAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIdProfileAC(res.data._id))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    }finally {
            dispatch(setAppStatusAC('idle'))
        }
}
export const logoutTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch (setAppStatusAC('loading'))
        await authAPI.logout()
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
export const registerTC = (data: LoginParamsType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await authAPI.register(data)
        dispatch(signUpAC(true))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

// types
export type AuthActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppIsInitializedAC>
    | ReturnType<typeof setServerErrorAC>
    | ReturnType<typeof setIdProfileAC>
    | ReturnType<typeof signUpAC>

