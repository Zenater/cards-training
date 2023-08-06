import React from 'react';
import {useAppDispatch, useAppSelector} from "../../store/store";
import {addNewPackTC} from "../../store/reducers/packsReducer";
import {Navigate} from "react-router-dom";
import s from './Profile.module.css'
import {Search} from "./Search/Search";
import {ModalAddPack} from "./addNewpack/ModalAddPack";
import {ProfileInfo} from "./Profile Info/ProfileInfo";
import {PacksTable} from "./PacksTable/PacksTable";
import {PATH} from "../Routes/Navigates";
import {selectIsLoggedIn} from "../../store/selectors";


export const Profile = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const dispatch = useAppDispatch();

    const addNewPack = (name: string, file: string, privatePacks: boolean) => {
        dispatch(addNewPackTC(name, file, privatePacks))
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={s.profileBox}>
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
