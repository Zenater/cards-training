import * as React from 'react';
import {FC, PropsWithChildren} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import SchoolIcon from '@mui/icons-material/School';
import s from "./modalDelete/ModalDelete.module.css";

export type ButtonsForModalType = "justButton" | "delButton" | "changeNamePack" | "startLearn" |'newCard'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    padding:'10px',

};

type PropsType = {
    button: ButtonsForModalType
    open: boolean
    setOpen: (value: boolean) => void
    cardsCount?:number

}
export const BasicModal: FC<PropsWithChildren<PropsType>> = ({children, open, setOpen, button, cardsCount} ) => {

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let changeButton;
    if (button === "justButton") {
        changeButton = <button className={s.buttonAddModal}  onClick={handleOpen}>New Pack</button>
    }
    if (button === "newCard") {
        changeButton = <button className={s.buttonAddModal}  onClick={handleOpen}>New Card</button>
    }
    else if (button === "delButton") {
        changeButton = <IconButton onClick={handleOpen} aria-label="delete">
            <DeleteIcon/>
        </IconButton>
    }
    else if (button === "changeNamePack") {
        changeButton = <DriveFileRenameOutlineIcon onClick={handleOpen} style={{cursor:'pointer',display:'flex'}}/>
    }
    else if (button === "startLearn") {
        changeButton = <button
            style={{border:"none", backgroundColor:"transparent",padding:0,marginLeft:'5px'}}
                               onClick={handleOpen}
                               disabled={cardsCount === 0}>
            <SchoolIcon/>
        </button>
    }
    return (
        <div>
            {changeButton}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}
