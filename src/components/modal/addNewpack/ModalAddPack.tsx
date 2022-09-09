import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import {BasicModal} from "../BasicModal";
import TextField from "@mui/material/TextField";
import s from './ModalAddPack.module.css'
import {useAppSelector} from "../../../store/store";
import {InputTypeFileCover} from "../../AddCover/InputTypeFileCover";
import cover from "../../../style/images/branding_logo.png";
import {CheckBox} from "../../Checkbox/CheckBox";
import {ButtonGroup} from "../../ButtonsGroup/ButtonGroup";


type ModalAddPackPropsType = {
    addNewPack: (name: string, file: string, privatePacks: boolean) => void
}

export const ModalAddPack: React.FC<ModalAddPackPropsType> = ({addNewPack}) => {

    const privatePacks = useAppSelector(state => state.packs.filterForPacks.private);

    const [newName, SetNewName] = useState("");
    const [error, SetError] = useState<null | string>(null);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState('');

    const addNewPackHandler = (file: string) => {
        if (newName.trim() !== "") {
            addNewPack(newName, file, privatePacks!)
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

    const addPack = () => addNewPackHandler(file)

    return (
        <BasicModal button={"justButton"} open={open} setOpen={setOpen}>
            <div className={s.container}>
                <div className={s.buttonDelete}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
                <div>
                    <p className={s.center}>Add new pack</p>
                </div>
                <div className={s.img}>
                    <img width={60} height={30} src={cover} alt="you cover"/>
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
                <ButtonGroup changeCards={addPack} cancelHandler={cancelHandler}/>
            </div>
        </BasicModal>
    );
}

