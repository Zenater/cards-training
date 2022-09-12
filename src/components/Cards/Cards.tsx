import React, {useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {useParams} from "react-router-dom";
import {changeCountOfRawsCardsAC, changeCurrentPageCardsAC, deleteCardsTC, getCardsTC} from '../../store/reducers/cardsReducer';
import {ModalAddCard} from "./Modal Add Cards/ModalAddCard";
import {ModalChangeCards} from "./Modal Change Cards/ModalChangeCards";
import {TablePagination} from "@mui/material";
import {Grade} from './Grade/Grade';
import {ModalDelete} from "../Profile/PacksTable/modal/modalDelete/ModalDelete";
import s from './Cards.module.css'
import {Pagination} from "../../common/Pagination/Pagination";

export const Cards = React.memo(() => {

    const cards = useAppSelector(state => state.card.cards);
    const userID = useAppSelector(state => state.profile.profile._id);

    const dispatch = useAppDispatch()
    const {id} = useParams<{ id: string }>()

    useEffect(() => {dispatch(getCardsTC(id!))}, [dispatch, id])

    const deleteCardsHandler = (packId: string,) => dispatch(deleteCardsTC(id!, packId))

    if (!cards) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className={s.packsBox}>
            <div className={s.settingsCards}>

                <ModalAddCard/>
                <div className={s.tableBox}>
                    <table className={s.table}>
                        <thead>
                        <tr>
                            <th align="center">Question</th>
                            <th align="center">Answer</th>
                            <th align="center"> Updated</th>
                            <th align="center">Grade</th>
                            <th align="center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cards.map((row) => (
                            <tr key={row._id}>
                                <td align="center">{row.question}</td>
                                <td align="center">{row.answer}</td>
                                <td align="center">{row.updated.toString().slice(2, 10)}</td>
                                <td align="center"><Grade value={row.grade}/></td>
                                <td align="center">
                                    {userID === row.user_id &&
                                        <div className={s.flex}>
                                            <ModalDelete deleteLine={deleteCardsHandler} id={row._id} name={'card'}
                                                         title={'Cards'}/>
                                            <ModalChangeCards _id={row._id} question={row.question}
                                                              answer={row.answer}/>
                                        </div>
                                    }
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {cards && 0 !== cards.length &&
                        <Pagination/>
                    }
                    <div>
                        {cards && !cards.length && <span style={{color: "purple"}}>cards not created</span>}
                    </div>
                </div>
            </div>
        </div>
    )
});




