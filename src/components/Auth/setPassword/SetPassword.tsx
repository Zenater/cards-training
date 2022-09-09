import React, {useState} from 'react'
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import {useFormik} from "formik";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormLabel from '@mui/material/FormLabel';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import styleContainer from "../../../style/Container.module.css"
import {FormikErrorType} from '../Registartion/Registration';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {sendNewPasswordTC} from "../../../store/forgotPasReducer";
import {handleServerAppError} from "../../../utils/error-utils";
import s from "./../Login/Login.module.css";

export const SetPassword = () => {

    const [disable, setDisable] = useState<boolean>(false)
    const isRegistration = useAppSelector(state => state.auth.isRegistration)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const {token} = useParams<string>()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            password: '',
            resetPasswordToken: token,
            confirmPassword: ''
        },
        validate: (values) => {
            const errors: Partial<FormikErrorType> = {};
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = 'password shout be > 8 symbols';
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Password is required';
            }
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords are not equal';
            }
            if (formik.errors.password || formik.errors.confirmPassword) {
                Object.keys(errors).length === 0 ? setDisable(false) : setDisable(true)
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                await dispatch(sendNewPasswordTC(values))
                navigate('/login')
                setDisable(true)
                formik.resetForm()
            } catch (e: any) {
                handleServerAppError(e, dispatch)
                setDisable(false)
            }
        },
    })
    const [values, setValues] = useState({
        amount: '',
        password: '',
        confirmPassword: false,
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => setValues({...values, showPassword: !values.showPassword,})
    const handleClickShowConfirmPassword = () => setValues({...values, confirmPassword: !values.confirmPassword,});

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    if (isRegistration) {
        return <Navigate to={'/login'}/>
    }
    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div className={styleContainer.container}>
            <div className={s.container}>
                <div className={s.group}>
                    <FormControl>
                        <h2 className={s.title}>it-incubator</h2>
                        <p>Create new password</p>
                        <form onSubmit={formik.handleSubmit}>
                            <FormGroup sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput label="Password"
                                                   type={values.showPassword ? 'text' : 'password'}
                                                   {...formik.getFieldProps('password')}
                                                   endAdornment={
                                                       <InputAdornment position="end">
                                                           <IconButton
                                                               aria-label="toggle password visibility"
                                                               onClick={handleClickShowPassword}
                                                               onMouseDown={handleMouseDownPassword}
                                                               edge="end"
                                                           >
                                                               {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                           </IconButton>
                                                       </InputAdornment>
                                                   }
                                    />
                                </FormControl>
                                {formik.errors.password && formik.touched.password &&
                                    <div style={{color: "red"}}>{formik.errors.password}</div>
                                }
                                <FormControl style={{marginTop: "10px", marginBottom: "10px"}} variant="outlined"
                                             className={s.confirmPass}>
                                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                    <OutlinedInput label="Confirm Password"
                                                   type={values.confirmPassword ? 'confirmPassword' : 'password'}
                                                   {...formik.getFieldProps("confirmPassword")}
                                                   endAdornment={
                                                       <InputAdornment position="end">
                                                           <IconButton
                                                               aria-label="toggle password visibility"
                                                               onClick={handleClickShowConfirmPassword}
                                                               onMouseDown={handleMouseDownPassword}
                                                               edge="end"
                                                           >
                                                               {values.confirmPassword ? <VisibilityOff/> :
                                                                   <Visibility/>}
                                                           </IconButton>
                                                       </InputAdornment>
                                                   }
                                    />
                                </FormControl>
                                {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                                    <div style={{color: "red"}}>{formik.errors.confirmPassword}</div>}
                                <br/>
                                <p>Create new password and we will send you further instructions to email</p>
                                <br/>
                                <button disabled={disable} className={s.buttonForLogin}>
                                    Create new password
                                </button>
                            </FormGroup>
                        </form>
                        <FormLabel>
                        </FormLabel>
                    </FormControl>
                </div>
            </div>
        </div>
    )
};



