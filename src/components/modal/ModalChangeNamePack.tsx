import * as React from 'react';
import Button from '@mui/material/Button';
import {BasicModal} from "./BasicModal";
import TextField from "@mui/material/TextField";
import {ButtonGroup} from "@mui/material";
import {ChangeEvent, useState} from "react";
import style from "../Profile/Profile.module.css";
import m from "../Cards/ModalForNewCards.module.css";
import {InputTypeFileCover} from "./addNewpack/InputTypeFileCover";
import Checkbox from "@mui/material/Checkbox";
import {setPrivatePacksAC} from "../../store/packsReducer";
import {useAppDispatch, useAppSelector} from "../../store/store";


type ModalAddPackPropsType = {
    changeNamePack: (id: string, name: string,file:string) => void
    id: string
    nameOfPack: string
}

export const ModalChangeNamePack: React.FC<ModalAddPackPropsType> = ({changeNamePack, id, nameOfPack}) => {

    const privatePacks = useAppSelector(state => state.packs.filterForPacks.private);
    const dispatch = useAppDispatch()

    let [newName, SetNewName] = useState(nameOfPack);
    const [error, SetError] = useState<null | string>(null);
    const [open, setOpen] = React.useState(false);
    const [file,setFile] = useState<string>('');

    const addNewPackHandler = (file:string) => {
        if (newName.trim() !== "") {
            changeNamePack(id, newName,file)
            SetNewName("")
            setOpen(false)
        } else {
            SetError("Enter Text")
        }
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && addNewPackHandler(file);

    const onChangeHandler = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) => {
        SetError(null)
        SetNewName(e.currentTarget.value)
    }
    const cancelHandler = () => setOpen(false)

    const onChangeHandlerStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(setPrivatePacksAC(newIsDoneValue))
    }

    return (
        <BasicModal button={"changeNamePack"} open={open} setOpen={setOpen}>
            <div className={m.container}>
                <div className={m.x}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
                <div>
                    <p className={m.title}>Change name of your pack</p>
                </div>
                <div><img src="#" alt="your cover"/></div>
                <div className={m.title}>
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
                <div className={m.title}>
                    {error && <div className={style.error}>{error}</div>}
                </div>
                <div className={m.title}>
                    <Checkbox
                        checked={privatePacks}
                        color="primary"
                        onChange={onChangeHandlerStatus}
                    />
                    <span>private packs</span>
                </div>
                <InputTypeFileCover setFile={setFile} />
                <div className={m.buttons}>
                    <Button onClick={cancelHandler} style={{width: "124px"}}>Cancel</Button>
                    <Button onClick={()=>addNewPackHandler(file)} style={{width: "124px"}}>Send</Button>
                </div>
            </div>
        </BasicModal>
    );
}

