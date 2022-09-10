import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import {BasicModal} from "../BasicModal";
import TextField from "@mui/material/TextField";
import s from "./ModalChangeNamePack.module.css";
import {InputTypeFileCover} from "../../AddCover/InputTypeFileCover";
import cover from "../../../style/images/branding_logo.png";
import {CheckBox} from "../../Checkbox/CheckBox";
import {ButtonGroup} from "../../ButtonsGroup/ButtonGroup";


type ModalAddPackPropsType = {
    changeNamePack: (name: string,file:string,id: string) => void
    id: string
    nameOfPack: string
    img:string
}

export const ModalChangeNamePack: React.FC<ModalAddPackPropsType> = ({changeNamePack, id, nameOfPack,img}) => {

    let [newName, SetNewName] = useState(nameOfPack);
    const [error, SetError] = useState<null | string>(null);
    const [open, setOpen] = useState(false);
    const [file,setFile] = useState('');

    const changeNamePackHandler = (file:string) => {
        if (newName.trim() !== "") {
            changeNamePack(newName,file,id)
            setOpen(false)
        } else SetError("Enter Text")
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && changeNamePackHandler(file);

    const onChangeHandler = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) => {
        SetError(null)
        SetNewName(e.currentTarget.value)
    }
    const cancelHandler = () => setOpen(false)
    const changePack = () => changeNamePackHandler(file)


    return (
        <BasicModal button={"changeNamePack"} open={open} setOpen={setOpen}>
            <div className={s.container}>
                <div className={s.buttonDelete}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
                <div>
                    <p className={s.center}>Change pack</p>
                </div>
                <div className={s.img}>
                    <img width={60} height={30} src={img || cover} alt="you cover"/>
                </div>
                <div className={s.center}>
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
                <div className={s.center}>
                    {error && <div className={s.error}>{error}</div>}
                </div>
                <CheckBox/>
                <InputTypeFileCover setFile={setFile}/>
                <ButtonGroup changeCards={changePack} cancelHandler={cancelHandler}/>
            </div>
        </BasicModal>
    );
}
