import React, {useState} from 'react';
import s from "./PacksTable.module.css";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import cover from "../../../style/images/branding_logo.png";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../App";
import {ModalDelete} from "../../modal/modalDelete/ModalDelete";
import {ModalChangeNamePack} from "../../modal/madalChangeNamePack/ModalChangeNamePack";
import {ModalStartLearn} from "../../modal/Learn/ModalStartLearn";
import {Pagination} from "../Pagination/Pagination";
import {changePackTC, deletePackTC, getPacksTC, sortPacksAc} from "../../../store/packsReducer";
import {useAppDispatch, useAppSelector} from "../../../store/store";

type filtersNamesType = "name" | "updated" | "cardsCount"

export const PacksTable = () => {

    const packs = useAppSelector(state => state.packs.cardPacks);
    const userID = useAppSelector(state => state.profile.profile._id);
    const dispatch = useAppDispatch();


    const [filter, setFilter] = useState<Record<filtersNamesType, boolean>>({
        name: false,
        updated: false,
        cardsCount: false
    })

    const deletePackHandler = (id: string) => dispatch(deletePackTC(id));

    const changePack = (name: string, file: string, id: string) => {
        dispatch(changePackTC(name, file, id));
    }


    const onSortTable = (filterStatus: boolean, filteresNames: filtersNamesType) => {
        filterStatus ? dispatch(sortPacksAc(`0${filteresNames}`)) : dispatch(sortPacksAc(`1${filteresNames}`))
        setFilter({...filter, [filteresNames]: !filterStatus})
        dispatch(getPacksTC())
    };
    return (
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
            <Pagination/>
        </div>

    );
};

