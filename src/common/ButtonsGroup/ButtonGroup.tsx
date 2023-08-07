import React from 'react';
import s from "../../components/Profile/PacksTable/modal/madalChangeNamePack/ModalChangeNamePack.module.css";
import {ModalAddPackPropsType} from "../../types/ModalTypes";

export const ButtonGroup = ({changeCards, cancelHandler,}: ModalAddPackPropsType) => {
    return (
        <div className={s.buttons}>
            <button onClick={cancelHandler} className={s.buttonCancel}>Cancel</button>
            <button onClick={changeCards} className={s.buttonSave}>Save</button>
        </div>
    );
};

