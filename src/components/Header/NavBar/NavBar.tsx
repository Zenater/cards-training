import React from 'react';
import {NavLink} from "react-router-dom";
import s from "./NavBar.module.css"
import LogoutIcon from "@mui/icons-material/Logout";
import {logoutTC} from "../../../store/authReducer";
import {useAppDispatch} from "../../../store/store";

export const NavBar = () => {
    const dispatch = useAppDispatch();

    const logoutHandler = () => dispatch(logoutTC())

    return (
        <nav className={s.navBar}>
            <div className={s.item}><NavLink to="/login" className={({isActive})=> isActive ? s.active : s.item}>Login</NavLink></div>
            <div className={s.item}><NavLink to="/registration" className={({isActive})=> isActive ? s.active : s.item}>Registration</NavLink></div>
            <div className={s.item}><NavLink to="/profile" className={({isActive})=> isActive ? s.active : s.item}>Profile</NavLink></div>
            <LogoutIcon onClick={logoutHandler} style={{cursor: 'pointer'}}/>
        </nav>
    );
};

