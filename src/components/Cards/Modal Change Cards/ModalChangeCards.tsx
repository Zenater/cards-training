import * as React from 'react';
import {ChangeEvent, useState,KeyboardEvent} from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {useAppDispatch} from "../../../store/store";
import {useParams} from "react-router-dom";
import {BasicModal} from "../../modal/BasicModal";
import {updateCardsTC} from "../../../store/cardsReducer";
import s from "./ModalChangeCards.module.css";
import {ButtonGroup} from "../../ButtonsGroup/ButtonGroup";


type ModalAddPackPropsType = {
    _id?: string
    question: string
    answer: string
}

export const ModalChangeCards: React.FC<ModalAddPackPropsType> = ({_id, answer, question}) => {

    const dispatch = useAppDispatch()
    const {id} = useParams()

    const [addValue, setAddValue] = useState(question)
    const [addValue2, setAddValue2] = useState(answer)
    const [error, setError] = useState<null | string>(null);
    const [open, setOpen] = useState(false);

    const changeCards = () => {
        if (_id && id) {
            if (addValue.trim() && addValue2.trim() !== "") {
                dispatch(updateCardsTC(_id, addValue, addValue2, id))
                setOpen(false)
            } else setError("Enter text")
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && changeCards();
    const onKeyPressHandler2 = (e: KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && changeCards();

    const cancelHandler = () => setOpen(false)

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setError(null)
        setAddValue(e.currentTarget.value)
    }

    const onChangeHandler2 = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setError(null)
        setAddValue2(e.currentTarget.value)
    }

    return (
        <BasicModal button={"changeNamePack"} open={open} setOpen={setOpen}>
            <div className={s.container}>
                <div className={s.buttonDelete}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
                <div>
                    <p className={s.title}>Change name of your cards</p>
                    <div className={s.title}>
                        <TextField
                            id="standard-textarea"
                            label="Question"
                            placeholder="change Question"
                            multiline
                            variant="standard"
                            value={addValue}
                            onChange={onChangeHandler}
                            onKeyPress={onKeyPressHandler}
                        />
                    </div>
                    <div className={s.title}>
                        {error && <div className={s.error}>{error}</div>}
                    </div>
                    <div className={s.title}>
                        <TextField
                            id="standard-textarea"
                            label="Answer"
                            placeholder="change Answer"
                            multiline
                            variant="standard"
                            value={addValue2}
                            onChange={onChangeHandler2}
                            onKeyPress={onKeyPressHandler2}
                        />
                    </div>
                    <div className={s.title}>
                        {error && <div className={s.error}>{error}</div>}
                    </div>
                    <ButtonGroup changeCards={changeCards} cancelHandler={cancelHandler}/>
                </div>
            </div>
        </BasicModal>
    );
}

