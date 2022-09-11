import React from 'react';
import s from "./CheckEmail.module.css"
import styleContainer from "../../../../style/Container.module.css"
import checkEmailAvatar from "../../../../style/images/Web app/Group 281.png"
import {useAppSelector} from "../../../../store/store";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../Navigates/Navigates";

export const CheckEmail = React.memo(() => {

    const email = useAppSelector(state => state.forgotPas.email);

    return (
        <div className={styleContainer.container}>
            <div className={s.container}>
                <div className={s.checkEmailContainer}>
                    <p className={s.header}>It-incubator</p>
                    <img src={checkEmailAvatar} alt="check Email Avatar"/>
                    <p className={s.textCheckEmail}>Check Email</p>
                    <p className={s.exampleMail}>We’ve sent an Email with instructions to <b>{email}</b></p>
                    <NavLink to={PATH.LOGIN}>Back to Login?</NavLink>
                </div>
            </div>
        </div>
    );
})
