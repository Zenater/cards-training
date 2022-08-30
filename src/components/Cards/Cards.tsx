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

export const Cards = React.memo(() => {

    const cards = useAppSelector(state => state.card.cards);
    const userID = useAppSelector(state => state.profile.profile._id);
    const cardsAllPage = useAppSelector(state => state.card.cardsTotalCount);
    const currentCardsPage = useAppSelector(state => state.card.page) || 1;
    const amountOfRows = useAppSelector(state => state.card.pageCount) || 4;

    const dispatch = useAppDispatch()
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
            dispatch(getCardsTC(id!));
        }, [dispatch, id])


    const deleteCardsHandler = (packId: string,) => {
        dispatch(deleteCardsTC(id!, packId))
    }

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
            <ModalAddCard/>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Question</TableCell>
                                <TableCell align="left">Answer</TableCell>
                                <TableCell align="center"> Updated</TableCell>
                                <TableCell align="right">Grade</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cards.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell align="left">{row.question}</TableCell>
                                    <TableCell align="left">{row.answer}</TableCell>
                                    <TableCell align="right">{row.updated.toString().slice(2, 10)}</TableCell>
                                    <TableCell align="right"><Grade value={row.grade}/></TableCell>
                                    <TableCell align="right">
                                        {userID === row.user_id &&
                                            <div style={{display: "flex"}}>
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




