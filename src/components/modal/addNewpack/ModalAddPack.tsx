import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import Button from '@mui/material/Button';
import {BasicModal} from "../BasicModal";
import TextField from "@mui/material/TextField";
import style from "../../Profile/Profile.module.css";
import s from "../../Cards/ModalForNewCards.module.css";
import Checkbox from '@mui/material/Checkbox';
import {setPrivatePacksAC} from "../../../store/packsReducer";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {InputTypeFileCover} from "./InputTypeFileCover";
import cover from "../../../style/images/branding_logo.png";


type ModalAddPackPropsType = {
    addNewPack: (newName: string, privatePacks: boolean, file: string) => void
}

export const ModalAddPack: React.FC<ModalAddPackPropsType> = ({addNewPack}) => {

    const privatePacks = useAppSelector(state => state.packs.filterForPacks.private);

    const [newName, SetNewName] = useState("");
    const [error, SetError] = useState<null | string>(null);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState('');
    const dispatch = useAppDispatch()

    const addNewPackHandler = (file: string) => {
        if (newName.trim() !== "") {
            addNewPack(newName, privatePacks!, file)
            SetNewName("")
            setOpen(false)
        } else SetError("Enter text")
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && addNewPackHandler(file);

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        SetError(null)
        SetNewName(e.currentTarget.value)
    }
    const cancelHandler = () => setOpen(false)

    const onChangeHandlerStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        dispatch(setPrivatePacksAC(newIsDoneValue))
    }
    const addPack = () => addNewPackHandler(file)

    return (
        <BasicModal button={"justButton"} open={open} setOpen={setOpen}>
            <div className={s.container}>
                <div className={s.buttonDelete}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
                <p className={s.title}>Add new pack</p>
            </div>
            <div className={s.title}>
                <img width={60} height={30} src={cover} alt="you cover" />
            </div>
            <div className={s.title}>
                <TextField
                    id="standard-textarea"
                    label="Name pack"
                    placeholder="Add Name"
                    multiline
                    variant="standard"
                    value={newName}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
            </div>
            <div className={s.title}>
                {error && <div className={style.error}>{error}</div>}
            </div>
            <div className={s.title}>
                <Checkbox
                    checked={privatePacks}
                    color="primary"
                    onChange={onChangeHandlerStatus}
                />
                <span>private packs</span>
            </div>
            <InputTypeFileCover setFile={setFile}/>
            <div className={s.buttonGroup}>
                <button onClick={cancelHandler} className={s.buttonCancel}>Cancel</button>
                <button onClick={addPack} className={s.buttonSave}>Save</button>
            </div>
        </BasicModal>
    );
}

