import React, {useState} from 'react'
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import {useFormik} from "formik";
import s from './../Login/Login.module.css'
import {Navigate, useNavigate} from "react-router-dom";
import {FormikErrorType} from "../Registartion/Registration";
import styleContainer from "../../../style/Container.module.css"
import {NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {sendEmailTC, setEmailsAC} from "../../../store/reducers/forgotPassReducer";
import {PATH} from "../../Routes/Navigates";


export const ForgotPass = React.memo(() => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [disable, setDisable] = useState<boolean>(false)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
            from: "",
            message: `<div style="background-color: lime; padding: 15px">
            password recovery link: 
            <a href='https://zenater.github.io/cards-training/#/setPass/$token$'>
        
            link</a>
            </div>`,
        },
        validate: (values) => {
            const errors: Partial<FormikErrorType> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (! /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: async (values) => {
            dispatch(setEmailsAC(values.email))
            await dispatch(sendEmailTC(values))
            navigate(PATH.CHECK_EMAIL)
            setDisable(true)
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <div className={styleContainer.container}>
            <div className={s.container}>
                <div className={s.group}>
                    <FormControl >
                            <h2 className={s.title}>Forgot you password?</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <FormGroup sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <TextField margin="normal"
                                           label="Email"
                                           sx={{
                                               width:'266px'}}
                                           {...formik.getFieldProps('email')}
                                />
                                {formik.errors.email && formik.touched.email &&
                                    <div style={{color: "red"}}>{formik.errors.email}</div>}
                                    <p style={{padding:'15px'}}>Enter your email address and we will send you further instructions</p>

                                <button disabled={disable} className={s.buttonForLogin}>
                                    Send Instructions
                                </button>
                            </FormGroup>
                        </form>
                        <FormLabel>
                            <p style={{padding:'30px'}}>Did you remember your password?</p>
                            <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
                        </FormLabel>
                    </FormControl>
                </div>
            </div>
        </div>
    )
})

