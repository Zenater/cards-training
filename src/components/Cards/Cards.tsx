import React, {useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {useParams} from "react-router-dom";
import {changeCountOfRawsCardsAC, changeCurrentPageCardsAC, deleteCardsTC, getCardsTC} from '../../store/cardsReducer';
import {ModalAddCard} from "./ModalAddCard";
import {ModalChangeCards} from "./Modal Change Cards/ModalChangeCards";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
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

    useEffect(() => dispatch(getCardsTC(id!)), [dispatch, id])

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
        <div>
            <div className={s.addCard}>
                <ModalAddCard/>
            </div>

            <div style={{margin:'10px'}}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead style={{backgroundColor:'#ECECF9'}}>
                            <TableRow>
                                <TableCell align="center">Question</TableCell>
                                <TableCell align="center">Answer</TableCell>
                                <TableCell align="center"> Updated</TableCell>
                                <TableCell align="center">Grade</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cards.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{'&:last-child td, &:last-child th,&:nth-child(even)': {
                                            border: 0,
                                            backgroundColor: '#F8F7FD'
                                    }}
                                }>
                                    <TableCell align="center">{row.question}</TableCell>
                                    <TableCell align="center">{row.answer}</TableCell>
                                    <TableCell align="center">{row.updated.toString().slice(2, 10)}</TableCell>
                                    <TableCell align="center"><Grade value={row.grade}/></TableCell>
                                    <TableCell align="center">
                                        {userID === row.user_id &&
                                            <div style={{display: "flex",alignItems:"center",justifyContent:'center'}}>
                                                <ModalDelete deleteLine={deleteCardsHandler} id={row._id} name={'card'} title={'Cards'}/>
                                                <ModalChangeCards _id={row._id} question={row.question} answer={row.answer}/>
                                            </div>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div>
                        {cards && !cards.length && <span style={{color:"purple"}}>cards not created</span>}
                    </div>
                </TableContainer>
            </div>
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
        </div>
    )
});




