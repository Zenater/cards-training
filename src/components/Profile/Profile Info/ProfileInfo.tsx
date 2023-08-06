import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./ProfileInfo.module.css";
import avatar from "../../../assests/images/avatar.png";
import {InputTypeFile} from "./InputForUpdateAvatar/InputTypeFile";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {SliderForPacks} from "./Slider/SliderForPacks";
import {ButtonsForPack} from "./ButtonsForPack/ButtonsForPack";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {changeNameTC} from "../../../store/reducers/profileReducer";
import {selectProfile} from "../../../store/selectors";

export const ProfileInfo = () => {

    const profile = useAppSelector(selectProfile);
    const [editMode, setEditMode] = useState(false);
    const [error, SetError] = useState<null | string>(null);
    const [name, SetNewName] = useState(profile && profile.name ? profile.name : '')
    const dispatch = useAppDispatch();

    const editModeHandler = () => setEditMode(true)

    const onBlurHandler = () => {
        if (name.trim() !== "") {
            dispatch(changeNameTC(name))
            setEditMode(false)
            SetError(null)
        } else SetError("Enter text")
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && onBlurHandler();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        SetError(null)
        SetNewName(e.currentTarget.value)
    }

    return (
        <div className={s.profileInfo}>
            <div className={s.newB}>
                <img className={s.imagForProfile}
                     src={profile.avatar || avatar}
                     alt="avatar"/>
                <p data-tooltip={"change avatar"} className={s.nameOfProfile}>
                    <InputTypeFile/>
                </p>
                <div className={s.changeInput}>
                    {editMode ?
                        <input className={error ? s.errorInput : s.inputName}
                               onChange={onChangeHandler} value={name}
                               onBlur={onBlurHandler} autoFocus
                               maxLength={20}
                               onKeyPress={onKeyPressHandler}
                        />
                        :
                        <div className={s.nameOfProfile}>{profile.name}
                            <DriveFileRenameOutlineIcon onClick={editModeHandler}
                                                        style={{cursor: 'pointer'}}/>
                        </div>
                    }
                </div>
                <div>
                    {error && <div className={s.error}>{error}</div>}
                    <p className={s.description}>Front-end developer</p>
                </div>
            </div>
            <SliderForPacks/>
            <div>
                <p className={s.nameOfDescription}>Show packs cards</p>
            </div>
            <ButtonsForPack/>
        </div>
    );
};

