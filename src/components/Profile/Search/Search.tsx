import React, {ChangeEvent, useState} from 'react';
import {getPacksTC, setSearchNamePacksAC} from "../../../store/packsReducer";
import {useAppDispatch} from "../../../store/store";
import {Paper} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import s from "./Search.module.css";


export const Search = () => {

    const dispatch = useAppDispatch()
    const [error, setError] = useState<null | string>(null);
    const [searchName, setSearchName] = useState('')

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setSearchName(e.currentTarget.value)
        dispatch(setSearchNamePacksAC(e.currentTarget.value))
    }

    const onSearchHandler = () => {
        if (searchName.trim() !== '') {
            dispatch(getPacksTC())
            setSearchName('')
        } else setError("Enter text")
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && onSearchHandler

    return (
        <div className={s.center}>
            {error && <div className={s.error}>{error}</div>}
            <Paper component="form"
                   sx={{
                       p: '2px 4px',
                       display: 'flex',
                       alignItems: 'center',
                       width:360,
                       border: error ? "solid  2px red" : "solid  1px #9A91C8",
                       marginBottom: "20px",
                       backgroundColor: "#D9D9F1",
                       height: '36px',
                       borderRadius:'14px',
                   }}
            >
                <IconButton type="submit" sx={{p: '10px'}} aria-label="search" onClick={onSearchHandler}>
                    <SearchIcon/>
                </IconButton>
                <InputBase
                    onKeyPress={onKeyPressHandler}
                    onChange={onChangeInputHandler}
                    value={searchName}
                    placeholder="Search packs... "
                />
            </Paper>
        </div>
    );
};

