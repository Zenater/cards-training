import {authAPI} from "../components/api/api";
import {setIsLoggedInAC} from "./authReducer";
import {AppThunk} from "./store";
import {getProfileDataAC} from "./profileReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
}
export type AppInitialStateType = typeof initialState

export const appReducer = (state = initialState, action: AppActionType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const initializeAppTC = ():AppThunk => async (dispatch) => {
   try {
       dispatch(setAppStatusAC('loading'))
        let res = await authAPI.me()
       dispatch(setIsLoggedInAC(true))
       dispatch(setAppStatusAC('succeeded'))
       dispatch(getProfileDataAC(res.data))
   } catch (e: any) {
       dispatch(setIsLoggedInAC(false))
       dispatch(setAppStatusAC('idle'))
   } finally {
       dispatch(setAppIsInitializedAC(true))
   }
}
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppIsInitializedAC = (isInitialized: boolean) => ({
    type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)

export type AppActionType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppIsInitializedAC>
