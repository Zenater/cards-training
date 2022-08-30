import * as React from 'react';
import Button from '@mui/material/Button';
import {BasicModal} from "../BasicModal";
import s from "./ModalStartLearn.module.css";
import {Question} from "./Question";
import {useState} from "react";

type ModalStartType = {
    cardsCount: number
    nameOfPack: string
    packId: string
}

export const ModalStartLearn: React.FC<ModalStartType> = ({cardsCount, nameOfPack, packId}) => {

    const [open, setOpen] = useState(false);
    const cancelHandler = () => setOpen(false)

    return (
        <BasicModal cardsCount={cardsCount} button={"startLearn"} open={open} setOpen={setOpen}>
            <div className={s.container}>
                <div className={s.buttonDelete}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
                <div>
                    <h4  className={s.center}>Learn "{nameOfPack}"</h4>
                </div>
                <div>
                    <Question cancelHandler={cancelHandler} packId={packId} cardsCount={cardsCount}/>
                </div>
            </div>
        </BasicModal>
    );
}

