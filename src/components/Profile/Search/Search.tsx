import React, {ChangeEvent, useState} from 'react';
import {getPacksTC, setSearchNamePacksAC} from "../../../store/packsReducer";
import {useAppDispatch} from "../../../store/store";
import {Paper} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import style from "../Profile.module.css";


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
        <div>
            {error && <div className={style.error}>{error}</div>}
            <Paper component="form"
                   sx={{
                       p: '2px 4px',
                       display: 'flex',
                       alignItems: 'center',
                       minWidth:100,
                       maxWidth:400,
                       // width: 400,
                       border: error ? "solid  2px red" : "solid  1px #635D80",
                       marginBottom: "20px",
                       backgroundColor: "#ECECF9",
                       height: '36px'
                   }}
            >
                <IconButton type="submit" sx={{p: '10px'}} aria-label="search" onClick={onSearchHandler}>
                    <SearchIcon/>
                </IconButton>
                <InputBase
                    onKeyPress={onKeyPressHandler}
                    onChange={onChangeInputHandler}
                    value={searchName}
                    placeholder="Search... "
                    // style={{maxWidth:'370px',minWidth:'100px'}}
                />
            </Paper>
        </div>
    );
};

