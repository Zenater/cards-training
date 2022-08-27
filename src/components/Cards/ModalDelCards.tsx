import * as React from 'react';
import Button from '@mui/material/Button';
import {ButtonGroup} from "@mui/material";
import {BasicModal} from "../modal/BasicModal";
import m from "./ModalForNewCards.module.css";
import {useCallback, useState} from "react";


type ModalAddPackPropsType = {
    id: string
    deleteCardsHandler: (id: string) => void
    name?: string
}

export const ModalDelCards: React.FC<ModalAddPackPropsType> = props => {

    const {id, deleteCardsHandler,name} = props;

    const [open, setOpen] = useState(false);

    const delPackHandler = useCallback(() => {
        deleteCardsHandler(id)
        setOpen(false)
    }, [id])

    const cancelHandler = () => {
        setOpen(false)
    }

    return (
        <BasicModal button={"delButton"} open={open} setOpen={setOpen}>
            <div className={m.container}>
                <div className={m.x}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
            </div>
            <div className={m.title}>
                <h4>Delete Cards</h4>
            </div>
            <div className={m.title}>
                <p>Do you really want to remove <b>{name}</b>?
                    <br/>
                    All cards will be excluded from this course.</p>
            </div>
            <div className={m.buttons}>
                <Button onClick={cancelHandler} style={{width: "124px"}}>Cancel</Button>
                <Button onClick={delPackHandler} style={{width: "124px"}}>Delete</Button>
            </div>
        </BasicModal>
    );
}

