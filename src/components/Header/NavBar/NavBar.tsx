import React from 'react';
import {NavLink} from "react-router-dom";
import s from "./NavBar.module.css"
import LogoutIcon from "@mui/icons-material/Logout";
import {logoutTC} from "../../../store/authReducer";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {PATH} from "../../../App";

export const NavBar = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const logoutHandler = () => dispatch(logoutTC())

    return (
        <nav className={s.navBar}>
            {!isLoggedIn
                &&  <div className={s.item}><NavLink to={PATH.LOGIN} className={({isActive})=> isActive ? s.active : s.item}>Login</NavLink></div>
                && <div className={s.item}><NavLink to={PATH.REGISTER} className={({isActive})=> isActive ? s.active : s.item}>Registration</NavLink></div>
            }

            <div className={s.item}><NavLink to={PATH.PROFILE} className={({isActive})=> isActive ? s.active : s.item}>Profile</NavLink></div>

            {isLoggedIn && <LogoutIcon onClick={logoutHandler} style={{cursor: 'pointer'}}/>}
        </nav>
    );
};

