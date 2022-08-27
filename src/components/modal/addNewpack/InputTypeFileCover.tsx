import React, {ChangeEvent, Dispatch, FC, SetStateAction} from 'react';
import {Button} from '@mui/material';

type PropsType ={
    setFile?: Dispatch<string>
}

export const InputTypeFileCover:FC<PropsType> = React.memo(({setFile}) => {

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setFile && setFile(file64);
                    // dispatch(updateProfileTC({avatar: file64}))
                })
            } else {
                // dispatch(setAppErrorAC('Файл слишком большого размера'))
            }
        }
    }
    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    return (
        <label>
            <input type="file"
                   onChange={uploadHandler}
                   style={{display: 'none'}}
                   accept={"image/*"}
            />
            <Button variant="contained" component="span">
                New Cover
            </Button>
        </label>
    )
})