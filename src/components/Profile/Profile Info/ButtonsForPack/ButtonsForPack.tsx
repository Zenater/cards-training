import React, {useState} from 'react';
import s from "./ButtonsForPacks.module.css";
import {getPacksTC, showPyPacks} from "../../../../store/reducers/packsReducer";
import {useAppDispatch, useAppSelector} from "../../../../store/store";

export const ButtonsForPack = () => {
    const user_id = useAppSelector(state => state.profile.profile._id)
    const [activeComponent, setActiveComponent] = useState(true)
    const dispatch = useAppDispatch();

    const onClickForAllHandler = () => {
        setActiveComponent(true)
        dispatch(showPyPacks(null))
        dispatch(getPacksTC())
    }

    const onClickForMyPacksHandler = () => {
        setActiveComponent(false)
        dispatch(showPyPacks(user_id))
        dispatch(getPacksTC())
    }

    const myPacksClassName = `${activeComponent ? s.active : s.buttonPacks}`;
    const allPacksClassName = `${!activeComponent ? s.active : s.buttonPacks}`;

    return (
            <div className={s.buttonsForPack}>
                <button onClick={onClickForMyPacksHandler} className={myPacksClassName}>My
                    Packs
                </button>
                <button onClick={onClickForAllHandler} className={allPacksClassName}>All
                    Packs
                </button>
            </div>
    );
};
