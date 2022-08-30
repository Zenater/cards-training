import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {BasicModal} from "../modal/BasicModal";
import {addNewCardsTC} from "../../store/cardsReducer";
import {useAppDispatch} from "../../store/store";
import {useParams} from "react-router-dom";
import style from "../Profile/Profile.module.css";
import s from "./ModalForNewCards.module.css";
import {ButtonGroup} from "../ButtonsGroup/ButtonGroup";


export const ModalAddCard = () => {

    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch()
    const [addValue, setAddValue] = useState('')
    const [addValue2, setAddValue2] = useState('')//
    const [error, SetError] = useState<null | string>(null);

    const {id} = useParams()

    const addNewCards = () => {
        if (id) {
            if (addValue.trim() && addValue2.trim() !== "") {
                dispatch(addNewCardsTC(id, addValue, addValue2))
                setAddValue("")
                setAddValue2("")
                setOpen(false)
            } else SetError("both fields are required")
        }
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        SetError(null)
        setAddValue(e.currentTarget.value)
    }
    const onChangeHandler2 = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        SetError(null)
        setAddValue2(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && addNewCards();

    const cancelHandler = () => setOpen(false)


    return (
        <BasicModal button={"newCard"} open={open} setOpen={setOpen}>
            <div className={s.container}>
                <div className={s.buttonDelete}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
                <div>
                    <h4 className={s.center}> Add new card</h4>
                    <div className={s.center}>
                        <TextField
                            id="standard-textarea"
                            label="Question"
                            placeholder="Add Name"
                            multiline
                            variant="standard"
                            value={addValue}
                            onChange={onChangeHandler}
                            onKeyPress={onKeyPressHandler}
                        />
                    </div>
                    <div className={s.center}>
                        <TextField
                            id="standard-textarea"
                            label="Answer"
                            placeholder="Add Name"
                            multiline
                            variant="standard"
                            value={addValue2}
                            onChange={onChangeHandler2}
                            onKeyPress={onKeyPressHandler}
                        />
                    </div>
                    <div className={s.center}>
                        {error && <div className={style.error}>{error}</div>}
                    </div>
                </div>
                <ButtonGroup changeCards={addNewCards} cancelHandler={cancelHandler}/>
            </div>
        </BasicModal>
    );
}

