import React from 'react';
import error404 from "./../../style/images/error404.svg"
import oops from "./../../style/images/oops.png"
import backToHome from "./../../style/images/backToHome.png"
import s from './PageNotFound.module.css'
import {NavLink} from "react-router-dom";


export const PageNotFound = () => {
    return (
        <div className={s.container}>
            <div>
                <img src={oops} alt={'page not found'}/>
                <div>
                    <NavLink to={'/'}>
                        <button className={s.backHome}>Back to home page</button>
                    </NavLink>
                </div>
            </div>
            <img src={error404} alt={'page not found'}/>
        </div>
    );
};
