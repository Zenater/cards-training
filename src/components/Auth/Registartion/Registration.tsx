import React, {useState} from 'react'
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import {useFormik} from "formik";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormLabel from '@mui/material/FormLabel';
import {Navigate, NavLink} from 'react-router-dom';
import styleContainer from "../../../style/Container.module.css"
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {registerTC} from "../../../store/authReducer";
import s from "../Login/Login.module.css";

export type  FormikErrorType = {
    email: string
    password: string
    confirmPassword: string
    rememberMe: boolean
}

export const Registration = () => {

    const [disable, setDisable] = useState(false)
    const isRegistration = useAppSelector(state => state.auth.isRegistration)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },

        validate: (values) => {
            const errors: Partial<FormikErrorType> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = 'password must be > 8 symbols';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Password is required';
            }
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords are not equal';
            }
            if (formik.errors.email || formik.errors.password || formik.errors.confirmPassword) {
                Object.keys(errors).length === 0 ? setDisable(false) : setDisable(true)
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(registerTC(values))
            setDisable(true)
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

    const handleClickShowPassword = () => setValues({...values, showPassword: !values.showPassword,});
    const handleClickShowConfirmPassword = () => setValues({...values, confirmPassword: !values.confirmPassword,});

    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();

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
                            <h2 className={s.title}>Sign Up</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <FormGroup>
                                <TextField margin="normal"
                                           label="Email"
                                           {...formik.getFieldProps('email')}
                                />
                                {formik.errors.email && formik.touched.email &&
                                <div style={{color: "red"}}>{formik.errors.email}</div>}

                                <FormControl variant="outlined" style={{marginTop:"5px", marginBottom:"5px"}}>
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
                                <div style={{color: "red"}}>{formik.errors.password}</div>}

                                <FormControl style={{marginTop:"10px", marginBottom:"10px"}} variant="outlined" className={s.confirmPass}>
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
                                                               {values.confirmPassword ? <VisibilityOff/> : <Visibility/>}
                                                           </IconButton>
                                                       </InputAdornment>
                                                   }
                                    />
                                </FormControl>
                                {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                                <div style={{color: "red"}}>{formik.errors.confirmPassword}</div>}
                                <button disabled={disable}  className={s.buttonForLogin} >
                                    Register
                                </button>
                            </FormGroup>
                        </form>
                        <FormLabel>
                            <p style={{padding:'20px'}}>Already registered?</p>
                            <NavLink to={'/login'}>SIGN IN</NavLink>
                        </FormLabel>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}


