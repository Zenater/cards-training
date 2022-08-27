import * as React from 'react';
import Button from '@mui/material/Button';
import {BasicModal} from "../BasicModal";
import m from "../../Cards/ModalForNewCards.module.css";
import {Question} from "./Question";


type ModalAddPackPropsType = {
    cardsCount:number
    nameOfPack:string
    packId:string
}

export const ModalStartLearn: React.FC<ModalAddPackPropsType> = props => {

    const {cardsCount, nameOfPack, packId} = props;

    const [open, setOpen] = React.useState(false);

    const cancelHandler = () => {
        setOpen(false)
    }

    return (
        <BasicModal cardsCount={cardsCount} button={"startLearn"} open={open} setOpen={setOpen} >
            <div className={m.container} >
                <div className={m.x}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
                    <h4 className={m.title}>Learn "{nameOfPack}"</h4>
                <div style={{display:"flex"}} className={m.title}>
                    <span><Question cancelHandler={cancelHandler}  packId={packId} cardsCount={cardsCount}/></span>
                </div>
            </div>
        </BasicModal>
    );
}

