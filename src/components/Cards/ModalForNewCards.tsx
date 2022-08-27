import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {BasicModal} from "../modal/BasicModal";
import {addNewCardsTC} from "../../store/cardsReducer";
import {useAppDispatch} from "../../store/store";
import {useParams} from "react-router-dom";
import style from "../Profile/Profile.module.css";
import m from "./ModalForNewCards.module.css";


export const ModalForNewCards = () => {

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
            } else {
                SetError("Введите текст")
            }
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

    const cancelHandler = () => {
        setOpen(false)
    }


    return (
        <BasicModal button={"justButton"} open={open} setOpen={setOpen}>
            <div className={m.container}>
                <div className={m.x}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
                <div>
                    <h4 className={m.title}> Add new card</h4>
                    <div className={m.title}>
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
                    <div className={m.title}>
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
                    <div className={m.title}>
                        {error && <div className={style.error}>{error}</div>}
                    </div>
                </div>

            <div  className={m.buttons}>
                <Button   variant="outlined" onClick={cancelHandler} style={{width: "124px"}}>Cancel</Button>
                <Button  variant="outlined"  onClick={addNewCards} style={{width: "124px"}}>Send</Button>
            </div>
            </div>
        </BasicModal>
    );
}

