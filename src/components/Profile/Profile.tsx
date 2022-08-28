import React, {useEffect, useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import styleContainer from "../../style/Container.module.css"
import style from "../Profile/Profile.module.css"
import {Slider} from "@mui/material";
import {changeNameTC} from "../../store/profileReducer";
import {EnhancedTable} from "./EnhancedTable/EnhancedTable";
import {getPacksTC, setMinMaxAmountOfCardsAC, showPyPacksAC} from "../../store/packsReducer";
import avatar from "../../style/images/avatar.png"
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Button from "@mui/material/Button";
import {PATH} from "../../App";
import {InputTypeFile} from "./InputTypeFile";
import {logoutTC} from "../../store/authReducer";
import LogoutIcon from '@mui/icons-material/Logout';
const useDebounce = (value1: number = 0, value2: number = 0, delay: number): number[] => {
    let [state, setState] = useState<number[]>([value1, value2])

    useEffect(() => {
        const timeId = setTimeout(() => {
            if(state[0] === value1 && state[1] === value2) return
            setState([value1, value2])
        }, delay)
        return () => {
            clearTimeout(timeId)
        }
    }, [delay, value1, value2])
    return state
}


export const Profile = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const minAmount = useAppSelector(state => state.packs.filterForPacks.minCardsCount);
    const maxAmount = useAppSelector(state => state.packs.filterForPacks.maxCardsCount);
    const user_id = useAppSelector(state => state.profile.profile._id)
    const profile = useAppSelector(state => state.profile.profile);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [editMode, setEditMode] = useState(false);
    const [name, SetNewName] = useState(profile && profile.name ? profile.name : '')
    const [error, SetError] = useState<null | string>(null);
    const [activeComponent, setActiveComponent] = useState(true)

    const minMAxAmount = [minAmount || 0, maxAmount || 100]
    let debouncedValue = useDebounce(minAmount, maxAmount, 1000);

    useEffect(() => {
        if (debouncedValue) {
            dispatch(getPacksTC())
        }
    }, [debouncedValue, dispatch])
    const editModeHandler = () => {
        setEditMode(true)
    }

    const onBlurHandler = () => {
        if (name.trim() !== "") {
            dispatch(changeNameTC(name))
            setEditMode(false)
            SetError(null)
        } else SetError("Enter text")
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
        SetError(null)
        SetNewName(e.currentTarget.value)
    }


    const handleChange = (event: Event, newValue: number | number[]) => {
        dispatch(setMinMaxAmountOfCardsAC(newValue as number[]));
    };


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && onBlurHandler();

    const onClickForMyPacksHandler = () => {
        setActiveComponent(false)
        dispatch(showPyPacksAC(user_id))
        dispatch(getPacksTC())
    }

    const onClickForAllHandler = () => {
        setActiveComponent(true)
        dispatch(showPyPacksAC(null))
        dispatch(getPacksTC())

    }

    const myPacksClassName = `${activeComponent ? style.active : style.buttonPacks}`;
    const allPacksClassName = `${!activeComponent ? style.active : style.buttonPacks}`;

    return (

        <div className={styleContainer.container}>
            <div className={style.mainProfile}>
                <div className={style.profileWithTable}>
                    <div className={style.profile}>
                        <div className={style.profileInfo}>
                                <img className={style.imagForProfile}
                                     src={profile.avatar || avatar}
                                     alt="avatar"/>
                                <p data-tooltip={"change avatar"} className={style.nameOfProfile}>
                                    <InputTypeFile/>
                                </p>
                            <div className={style.changeInput}>
                                {editMode ?
                                    <input className={error ? style.errorInput : ""}
                                           onChange={onChangeHandler} value={name}
                                           onBlur={onBlurHandler} autoFocus
                                           maxLength={20}
                                           onKeyPress={onKeyPressHandler}
                                    />
                                    :
                                    <p className={style.nameOfProfile}>{profile.name}
                                        <DriveFileRenameOutlineIcon onClick={editModeHandler} style={{cursor:'pointer'}}/>
                                    </p>
                                }
                            </div>
                            {error && <div className={style.error}>{error}</div>}
                            <p className={style.description}>Front-end developer</p>
                        </div>
                        <div className={style.numberOfCards}>
                            <p className={style.nameOfDescription}>Number of cards</p>
                            <div className={style.slider}>
                                <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                    value={minMAxAmount}
                                    defaultValue={[0, 100]}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                />
                            </div>
                            <div>
                                <p className={style.nameOfDescription}>Show packs cards</p>
                                <div className={style.buttonsForPack}>
                                    <button onClick={onClickForMyPacksHandler} className={myPacksClassName}>My
                                        Packs</button>
                                    <button onClick={onClickForAllHandler} className={allPacksClassName}>All
                                        Packs</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={style.table}>
                        <EnhancedTable/>
                    </div>
                </div>
            </div>
        </div>

    );
};
