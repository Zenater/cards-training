import {setAppErrorAC, setAppStatusAC} from "../store/appReducer";
import {Dispatch} from "redux";
import {AuthActionsType} from "../store/authReducer";
import axios, {AxiosError} from "axios";

export const handleServerAppError = (error: Error | AxiosError, dispatch: Dispatch<AuthActionsType>) => {
    const errorMessage = axios.isAxiosError(error)
        ? (error.response?.data as {error:string}).error
        : (error.message + ', more details in the console');
    dispatch(setAppErrorAC(errorMessage))
    dispatch(setAppStatusAC('failed'))
}

