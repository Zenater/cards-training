import Button from '@mui/material/Button';
import React, {ChangeEvent, Dispatch, FC} from 'react';
import s from './InputTypeFile.module.css'

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
                })
            } else alert('The file is too large')
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
        <label style={{display: 'flex', justifyContent: 'center', borderRadius:' 30px'}}>
            <input type="file"
                   onChange={uploadHandler}
                   style={{display: 'none'}}
                   accept={"image/*"}
            />
            <Button variant="contained" component="span" className={s.addCover} >
                New Cover
            </Button>
        </label>
    )
})