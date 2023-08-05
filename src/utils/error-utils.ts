import {setAppError, setAppStatus} from "../store/reducers/appReducer";
import {Dispatch} from "redux";
import {AuthActionsType} from "../store/reducers/authReducer";
import axios, {AxiosError} from "axios";

export const handleServerAppError = (error: Error | AxiosError, dispatch: Dispatch<AuthActionsType>) => {
    const errorMessage = axios.isAxiosError(error)
        ? (error.response?.data as {error:string}).error
        : (error.message + ', more details in the console');
    dispatch(setAppError(errorMessage))
    dispatch(setAppStatus('failed'))
}

