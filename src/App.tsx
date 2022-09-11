import React, {useEffect} from 'react';
import {NavBar} from "./components/Header/NavBar/NavBar";
import {useAppDispatch, useAppSelector} from "./store/store";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {initializeAppTC} from "./store/appReducer";
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import s from './App.module.css'
import {Navigates} from "./components/Navigates/Navigates";


export const App = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector((state) => state.app.isInitialized)

    useEffect(() => {
        if (!isInitialized) {
            dispatch(initializeAppTC())
        }
    }, [isInitialized, dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className={s.app}>
            <div className={s.container}>
                <ErrorSnackbar/>
                <NavBar/>
                {status === 'loading' && <LinearProgress color="success"/>}
                <Navigates/>
            </div>
        </div>
    );
}


