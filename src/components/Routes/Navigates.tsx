import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Profile} from "../Profile/Profile";
import {Login} from "../Auth/Login/Login";
import {Registration} from "../Auth/Registartion/Registration";
import {ForgotPass} from "../Auth/ForgotPass/ForgotPass";
import {SetPassword} from "../Auth/Set Password/SetPassword";
import {PageNotFound} from "../../common/Page404/PageNotFound";
import {Cards} from "../Cards/Cards";
import {CheckEmail} from "../Auth/ForgotPass/checkEmail/CheckEmail";

export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    PACKS: '/packs',
    CARDS: '/cards',
    FORGOT_PASS: '/forgotPass',
    CHECK_EMAIL: '/checkEmail',
    SET_NEW_PASS: '/setPass',
    PAGE_404 : '/404',
};

export const Navigates = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Profile/>}/>
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.REGISTER} element={<Registration/>}/>
            <Route path={PATH.FORGOT_PASS} element={<ForgotPass/>}/>
            <Route path={PATH.SET_NEW_PASS + `/:token`} element={<SetPassword/>}/>
            <Route path={PATH.PROFILE} element={<Profile/>}/>
            <Route path={PATH.PAGE_404} element={<PageNotFound/>}/>
            <Route path={PATH.CARDS + `/:id`} element={<Cards/>}/>
            <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
            <Route path="*" element={<Navigate to={PATH.PAGE_404}/>}/>
        </Routes>
    );
}

