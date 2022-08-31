import React from 'react';
import s from "../modal/madalChangeNamePack/ModalChangeNamePack.module.css";

type ModalAddPackPropsType = {
    changeCards:()=>void
    cancelHandler:()=>void
}

export const ButtonGroup: React.FC<ModalAddPackPropsType> = ({changeCards, cancelHandler,}) => {

    return (
        <div className={s.buttons}>
            <button onClick={cancelHandler} className={s.buttonCancel}>Cancel</button>
            <button onClick={changeCards} className={s.buttonSave}>Save</button>
        </div>
    );
};

