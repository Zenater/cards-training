import React, {useEffect} from 'react';
import './App.css';
import {NavBar} from "./components/Header/NavBar/NavBar";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {Test} from "./components/Test/Test";
import {PageNotFound} from "./components/Page404/PageNotFound";
import {useAppDispatch, useAppSelector} from "./store/store";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {initializeAppTC} from "./store/appReducer";
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {Cards} from "./components/Cards/Cards";
import {Registration} from "./components/Auth/Registartion/Registration";
import {SetPassword} from "./components/Auth/setPassword/SetPassword";
import {ForgotPass} from "./components/Auth/ForgotPass/ForgotPass";
import {CheckEmail} from "./components/Auth/ForgotPass/checkEmail/CheckEmail";
import {Login} from "./components/Auth/Login/Login";
import s from './App.module.css'
import {Profile} from "./components/Profile/Packs/Profile";

export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    PACKS: '/packs',
    CARDS: '/cards',
    LEARN: '/learn',
    TEST_MAP: '/test-map',
    TEST: '/text',
};

export const App = () => {
    const dispatch = useAppDispatch()
    const status=useAppSelector(state=>state.app.status)
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const isLoggedIn=useAppSelector(state => state.auth.isLoggedIn)
    const navigate=useNavigate()

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
            {status === 'loading' && <LinearProgress color="success" />}
            {/*{isLoggedIn && <div style={{marginBottom:"5px"}}></div>}*/}
            <Routes>
                <Route path={"/"} element={<Profile/>}/>
                <Route path={"login"} element={<Login/>}/>
                <Route path={"registration"} element={<Registration/>}/>
                <Route path={"forgotPass"} element={<ForgotPass/>}/>
                <Route path={"setPass/:token"} element={<SetPassword/>}/>
                <Route path={"profile"} element={<Profile/>}/>
                <Route path={"test"} element={<Test/>}/>
                <Route path={"404"} element={<PageNotFound/>}/>
                <Route path={"cards/:id"} element={<Cards/>}/>
                <Route path={"checkEmail"} element={<CheckEmail/>}/>
                <Route path="*" element={<Navigate to={"404"}/>}/>
            </Routes>
        </div>
        </div>
    );
}


