import React, {MouseEvent, ChangeEvent} from 'react';
import {changeCountOfRaws, changeCurrentPage, getPacksTC} from "../../store/reducers/packsReducer";
import {TablePagination} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {selectAmountOfRows, selectPacksAllPage, selectСurrentPacksPage} from "../../store/selectors";

export const Pagination = () => {
    const dispatch = useAppDispatch();
    const currentPacksPage = useAppSelector(selectСurrentPacksPage) || 1;
    const packsAllPage = useAppSelector(selectPacksAllPage);
    const amountOfRows = useAppSelector(selectAmountOfRows) || 4;

    const handleChangePage = (e: MouseEvent<HTMLButtonElement> | null, value: number) => {
        dispatch(changeCurrentPage(value))
        dispatch(getPacksTC())
    }
    const handleChangeRowsPerPage = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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
