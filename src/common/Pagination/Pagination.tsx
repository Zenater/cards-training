import React from 'react';
import {changeCountOfRaws, changeCurrentPage, getPacksTC} from "../../store/reducers/packsReducer";
import {TablePagination} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/store";

export const Pagination = () => {

    const dispatch = useAppDispatch();
    const currentPacksPage = useAppSelector(state => state.packs.filterForPacks.page) || 1;
    const packsAllPage = useAppSelector(state => state.packs.cardPacksTotalCount);
    const amountOfRows = useAppSelector(state => state.packs.filterForPacks.pageCount) || 4;

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
        dispatch(changeCurrentPage(value))
        dispatch(getPacksTC())
    }
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(changeCountOfRaws(+e.target.value))
        dispatch(getPacksTC())
    }
    return (
        <div>
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
    );
};
