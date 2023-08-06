import React, {ChangeEvent} from 'react';
import s from "./Checkbox.module.css";
import Checkbox from "@mui/material/Checkbox";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {setPrivatePacks} from "../../store/reducers/packsReducer";

export const CheckBox = () => {
    const dispatch = useAppDispatch()

    const privatePacks = useAppSelector(state => state.packs.filterForPacks.private);

    const onChangeHandlerStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setPrivatePacks(e.currentTarget.checked))
    }

    return (
        <div className={s.container}>
            <Checkbox
                checked={privatePacks}
                color="primary"
                onChange={onChangeHandlerStatus}
            />
            <span>private packs</span>
        </div>
    );
};
