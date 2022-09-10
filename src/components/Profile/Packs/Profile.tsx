import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {addNewPackTS} from "../../../store/packsReducer";
import {Navigate} from "react-router-dom";
import s from './Profile.module.css'
import {Search} from "../Search/Search";
import {ModalAddPack} from "../../modal/addNewpack/ModalAddPack";
import {ProfileInfo} from "../Profile Info/ProfileInfo";
import {PacksTable} from "../PacksTable/PacksTable";


export const Profile = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    const addNewPack = (name: string, file: string, privatePacks: boolean) => {
        dispatch(addNewPackTS(name, file, privatePacks))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.packsBox}>
            <div className={s.settings}>
                <Search/>
                <ModalAddPack addNewPack={addNewPack}/>
                <div className={s.info}>
                    <ProfileInfo/>
                    <PacksTable/>
                </div>
            </div>
        </div>

    );
}
