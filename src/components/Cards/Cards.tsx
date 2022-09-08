import React, {useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {useParams} from "react-router-dom";
import {changeCountOfRawsCardsAC, changeCurrentPageCardsAC, deleteCardsTC, getCardsTC} from '../../store/cardsReducer';
import {ModalAddCard} from "./Modal addCards/ModalAddCard";
import {ModalChangeCards} from "./Modal Change Cards/ModalChangeCards";
import {TablePagination} from "@mui/material";
import {Grade} from './Grade/Grade';
import {ModalDelete} from "../modal/modalDelete/ModalDelete";
import s from './Cards.module.css'

export const Cards = React.memo(() => {

    const cards = useAppSelector(state => state.card.cards);
    const userID = useAppSelector(state => state.profile.profile._id);
    const cardsAllPage = useAppSelector(state => state.card.cardsTotalCount);
    const currentCardsPage = useAppSelector(state => state.card.page) || 1;
    const amountOfRows = useAppSelector(state => state.card.pageCount) || 4;

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

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
        dispatch(changeCurrentPageCardsAC(value))
        dispatch(getCardsTC(id!))
    }

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(changeCountOfRawsCardsAC(+e.target.value))
        dispatch(getCardsTC(id!))
    }

    return (
        <div className={s.packsBox}>
            <div className={s.settings}>
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
                        <TablePagination
                            onClick={() => {
                                window.scrollTo({top: 0, behavior: 'smooth'})
                            }}
                            component="div"
                            count={cardsAllPage}
                            page={currentCardsPage}
                            onPageChange={handleChangePage}
                            rowsPerPage={amountOfRows}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    }
                    <div>
                        {cards && !cards.length && <span style={{color: "purple"}}>cards not created</span>}
                    </div>
                </div>
            </div>
        </div>
    )
});




