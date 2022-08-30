import * as React from 'react';
import {useCallback, useState} from 'react';
import Button from '@mui/material/Button';
import {BasicModal} from "../BasicModal";
import s from "./ModalDelete.module.css";

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
    },[deleteLine, id])

    const cancelHandler = () => setOpen(false)

    return (
        <BasicModal button={"delButton"} open={open} setOpen={setOpen}>
            <div className={s.container}>
                <div className={s.buttonDelete}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
            <div >
                <h4 className={s.center}>Delete {title}</h4>
            </div>
            <div className={s.title}>
                <p >Do you really want to remove - <b>{name}</b>?
                    <br/>
                    All cards will be excluded from this course.</p>
            </div>
            <div className={s.buttons}>
                <button onClick={cancelHandler} className={s.buttonCancelForDelete}>Cancel</button>
                <button onClick={delPackHandler} className={s.buttonForDelete}>Delete</button>
            </div>
            </div>
        </BasicModal>
    );
}

