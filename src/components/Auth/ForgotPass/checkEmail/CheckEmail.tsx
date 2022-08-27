import React from 'react';
import s from "./CheckEmail.module.css"
import styleContainer from "../../../../style/Container.module.css"
import checkEmailAvatar from "../../../../style/images/Web app/Group 281.png"
import {useAppSelector} from "../../../../store/store";
import {NavLink} from "react-router-dom";

export const CheckEmail = React.memo(() => {

    const email = useAppSelector(state => state.forgotPas.email);

    return (
        <div className={`${styleContainer.container} ${s.checkEmailContainerPad}`}>
            <div className={s.checkEmailContainer}>
                <p className={s.header}>It-incubator</p>
                <img src={checkEmailAvatar} alt=""/>
                <p className={s.textCheckEmail}>Check Email</p>
                <p className={s.exampleMail}>We’ve sent an Email with instructions to <b>{email}</b></p>
                <NavLink to={'/login'} >Back to Login?</NavLink>
            </div>
        </div>
    );
})
