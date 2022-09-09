import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {
    addNewPackTS,
    changeCountOfRawsAC,
    changeCurrentPageAC,
    changePackTC,
    deletePackTC,
    getPacksTC,
    setMinMaxAmountOfCardsAC,
    showPyPacksAC,
    sortPacksAc
} from "../../../store/packsReducer";
import cover from "../../../style/images/branding_logo.png";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../../App";
import {ModalDelete} from "../../modal/modalDelete/ModalDelete";
import {ModalChangeNamePack} from "../../modal/madalChangeNamePack/ModalChangeNamePack";
import {ModalStartLearn} from "../../modal/Learn/ModalStartLearn";
import s from './PacksTable.module.css'
import {Search} from "../Search/Search";
import {ModalAddPack} from "../../modal/addNewpack/ModalAddPack";
import {Slider, TablePagination} from "@mui/material";
import {changeNameTC} from "../../../store/profileReducer";
import avatar from "../../../style/images/avatar.png";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {InputTypeFile} from "../inputForUpdateAvatar/InputTypeFile";
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';

type filtersNamesType = "name" | "updated" | "cardsCount"

const useDebounce = (value1: number = 0, value2: number = 0, delay: number): number[] => {
    let [state, setState] = useState<number[]>([value1, value2])

    useEffect(() => {
        const timeId = setTimeout(() => {
            if (state[0] === value1 && state[1] === value2) return
            setState([value1, value2])
        }, delay)
        return () => {
            clearTimeout(timeId)
        }
    }, [delay, value1, value2])
    return state
}

export const PacksTable = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const minAmount = useAppSelector(state => state.packs.filterForPacks.minCardsCount);
    const maxAmount = useAppSelector(state => state.packs.filterForPacks.maxCardsCount);
    const user_id = useAppSelector(state => state.profile.profile._id)
    const profile = useAppSelector(state => state.profile.profile);

    const [editMode, setEditMode] = useState(false);
    const [name, SetNewName] = useState(profile && profile.name ? profile.name : '')
    const [error, SetError] = useState<null | string>(null);
    const [activeComponent, setActiveComponent] = useState(true)

    const packs = useAppSelector(state => state.packs.cardPacks);
    const currentPacksPage = useAppSelector(state => state.packs.filterForPacks.page) || 1;
    const packsAllPage = useAppSelector(state => state.packs.cardPacksTotalCount);
    const amountOfRows = useAppSelector(state => state.packs.filterForPacks.pageCount) || 4;
    const userID = useAppSelector(state => state.profile.profile._id);
    const dispatch = useAppDispatch();

    const [filter, setFilter] = useState<Record<filtersNamesType, boolean>>({
        name: false,
        updated: false,
        cardsCount: false
    })

    const minMAxAmount = [minAmount || 0, maxAmount || 100]
    let debouncedValue = useDebounce(minAmount, maxAmount, 1000);

    useEffect(() => {
        if (debouncedValue) {
            dispatch(getPacksTC())
        }
    }, [debouncedValue])

    const editModeHandler = () => setEditMode(true)

    const onBlurHandler = () => {
        if (name.trim() !== "") {
            dispatch(changeNameTC(name))
            setEditMode(false)
            SetError(null)
        } else SetError("Enter text")
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetError(null)
        SetNewName(e.currentTarget.value)
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        dispatch(setMinMaxAmountOfCardsAC(newValue as number[]));
    };


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
    const addNewPack = (name: string, file: string, privatePacks: boolean) => {
        dispatch(addNewPackTS(name, file, privatePacks))
    }

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(changeCountOfRawsAC(+e.target.value))
        dispatch(getPacksTC())
    }

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
        dispatch(changeCurrentPageAC(value))
        dispatch(getPacksTC())
    }

    const onSortTable = (filterStatus: boolean, filteresNames: filtersNamesType) => {
        filterStatus ? dispatch(sortPacksAc(`0${filteresNames}`)) : dispatch(sortPacksAc(`1${filteresNames}`))
        setFilter({...filter, [filteresNames]: !filterStatus})
        dispatch(getPacksTC())
    };

    const deletePackHandler = (id: string) => dispatch(deletePackTC(id));

    const changePack = (name?: string, file?: string, id?: string) => {
        dispatch(changePackTC(name!, file!, id!));
    }
    const myPacksClassName = `${activeComponent ? s.active : s.buttonPacks}`;
    const allPacksClassName = `${!activeComponent ? s.active : s.buttonPacks}`;

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.packsBox}>
            <div className={s.settings}>
                <Search/>
                <ModalAddPack addNewPack={addNewPack}/>
                <div className={s.info}>
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

                        <div className={s.slider}>
                            <p className={s.nameOfDescription}>Number of cards</p>
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={minMAxAmount}
                                defaultValue={[0, 100]}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div>
                            <p className={s.nameOfDescription}>Show packs cards</p>
                        </div>
                        <div className={s.buttonsForPack}>
                            <button onClick={onClickForMyPacksHandler} className={myPacksClassName}>My
                                Packs
                            </button>
                            <button onClick={onClickForAllHandler} className={allPacksClassName}>All
                                Packs
                            </button>
                        </div>
                    </div>
                    <div className={s.tableBox}>
                        <table className={s.table}>
                            <thead>
                            <tr>
                                <th>Cover</th>
                                <th>Name
                                    <ArrowDropDownSharpIcon fontSize={"medium"}
                                                            onClick={() => onSortTable(filter.name, "name")}
                                                            style={{cursor: 'pointer'}}
                                    />
                                </th>
                                <th>Cards
                                    <ArrowDropDownSharpIcon fontSize={"medium"}
                                                            onClick={() => onSortTable(filter.cardsCount, "cardsCount")}
                                                            style={{cursor: 'pointer'}}

                                    />
                                </th>
                                <th>Last Updated
                                    <ArrowDropDownSharpIcon fontSize={"medium"}
                                                            onClick={() => onSortTable(filter.updated, "updated")}
                                                            style={{cursor: 'pointer'}}
                                    />
                                </th>
                                <th>Created by</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>

                            {packs.map((row) => (

                                <tr key={row._id}>
                                    <td>
                                        <img width={30} height={30} src={row.deckCover || cover} alt="cover"/>
                                    </td>
                                    <td>
                                        <NavLink to={PATH.CARDS + `/${row._id}`} style={{wordBreak: 'break-word'}}>
                                            {row.name}
                                        </NavLink>
                                    </td>
                                    <td>
                                        {row.cardsCount}
                                    </td>
                                    <td>
                                        {row.updated.toString().slice(2, 10)}
                                    </td>
                                    <td>
                                        {row.user_name}
                                    </td>
                                    <td>
                                        <div className={s.actionModal}>

                                            {userID === row.user_id &&
                                                <div className={s.flex}>

                                                    <ModalDelete deleteLine={deletePackHandler} id={row._id}
                                                                 name={row.name}
                                                                 title={'Pack'}/>


                                                    <ModalChangeNamePack changeNamePack={changePack} id={row._id}
                                                                         nameOfPack={row.name} img={row.deckCover}
                                                    />

                                                </div>
                                            }
                                            <ModalStartLearn packId={row._id} nameOfPack={row.name}
                                                             cardsCount={row.cardsCount}/>
                                        </div>

                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div>
                            {packs.length === 0 && <span style={{color: "red"}}>nothing found</span>}
                        </div>
                        <TablePagination
                            onClick={() => {
                                window.scrollTo({top: 0, behavior: 'smooth'})
                            }}
                            component="div"
                            count={packsAllPage}
                            page={currentPacksPage}
                            onPageChange={handleChangePage}
                            rowsPerPage={amountOfRows}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}
