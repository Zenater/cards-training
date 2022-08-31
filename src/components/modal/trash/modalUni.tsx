import React, {useState} from 'react';
import {BasicModal, ButtonsForModalType} from "../BasicModal";
import s from "../addNewpack/ModalAddPack.module.css";
import Button from "@mui/material/Button";
import cover from "../../../style/images/branding_logo.png";
import TextField from "@mui/material/TextField";
import style from "../../Profile/Profile.module.css";
import {CheckBox} from "../../Checkbox/CheckBox";
import {InputTypeFileCover} from "../../AddCover/InputTypeFileCover";
import {useAppSelector} from "../../../store/store";

type ModalAddPackPropsType = {
    addNewPack?: (newName?: string | undefined,file?: string| undefined, privatePacks?: any ,id?: string| undefined,) => void
    button: ButtonsForModalType
    changeNamePack?: (id: string, name: string,file:string) => void
    id?: string
    nameOfPack?: string
    img?:string
}

export const ModalUni: React.FC<ModalAddPackPropsType> = ({addNewPack,button,id,changeNamePack,nameOfPack,img}) => {

    const privatePacks = useAppSelector(state => state.packs.filterForPacks.private);

    const [newName, SetNewName] = useState(nameOfPack);
    const [error, SetError] = useState<null | string>(null);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState('');

    const addNewPackHandler = (file: string) => {
        if (newName!.trim() !== "") {
            addNewPack!(newName,file, privatePacks)
            setOpen(false)
        } else SetError("Enter text")
    }

    // const changeNamePackHandler = (file:string) => {
    //     if (newName.trim() !== "") {
    //         changeNamePack!( newName,file,id!,)
    //         setOpen(false)
    //     } else SetError("Enter Text")
    // }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && addNewPackHandler(file);

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        SetError(null)
        SetNewName(e.currentTarget.value)
    }
    const cancelHandler = () => setOpen(false)

    const addPack = () => addNewPackHandler(file)
    return (
            <BasicModal button={button} open={open} setOpen={setOpen}>
                <div className={s.container}>
                    <div className={s.buttonDelete}>
                        <Button onClick={cancelHandler} variant="text">X</Button>
                    </div>
                    <div>
                        <p className={s.center}>Add new pack</p>
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
                        {error && <div className={style.error}>{error}</div>}
                    </div>
                    <CheckBox/>
                    <InputTypeFileCover setFile={setFile}/>
                    <div className={s.buttonGroup}>
                        <button onClick={cancelHandler} className={s.buttonCancel}>Cancel</button>
                        <button onClick={addPack} className={s.buttonSave}>Save</button>
                    </div>
                </div>
            </BasicModal>
    );
};
