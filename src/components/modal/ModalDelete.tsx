import * as React from 'react';
import {useCallback, useState} from 'react';
import Button from '@mui/material/Button';
import {BasicModal} from "./BasicModal";
import s from "../Cards/ModalForNewCards.module.css";


type ModalAddPackPropsType = {
    id: string
    deleteLine: (id: string) => void
    name: string
    title:string
}

export const ModalDelete: React.FC<ModalAddPackPropsType> = ({id, deleteLine, name,title}) => {

    const [open, setOpen] = useState(false);

    const delPackHandler = useCallback(() => {
        deleteLine(id)
        setOpen(false)
    },[])

    const cancelHandler = () => {
        setOpen(false)
    }

    return (
        <BasicModal button={"delButton"} open={open} setOpen={setOpen}>
            <div className={s.container}>
                <div className={s.x}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
            </div>
            <div className={s.title}>
                <h4>Delete {title}</h4>
            </div>
            <div className={s.title}>
                <p>Do you really want to remove - <b>{name}</b>?
                    <br/>
                    All cards will be excluded from this course.</p>
            </div>
            <div className={s.buttons}>
                <button onClick={delPackHandler} className={s.button2}>Cancel</button>
                <button onClick={cancelHandler} className={s.button}>Delete</button>
            </div>
        </BasicModal>
    );
}

