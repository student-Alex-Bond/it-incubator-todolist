import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from '@material-ui/core';
import React from 'react';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth-reducer";
import {AppRootState} from "../../components/App/store";
import { Navigate} from 'react-router-dom';



export const Login = () => {


    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({


        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'email is required'
                }
            }

            if (!values.password) {
                return {
                    password: 'password is required'
                }
            }

        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: true
        },
        onSubmit: (values) => {
            dispatch(loginTC(values))
        }
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (<Grid container justify={'center'}>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get redistricted <a href={'ya.ru'}>here</a>
                            </p>
                            <p>
                                or use tesr account credentials:
                            </p>
                            <p>Email: free@samiraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>

                            <TextField
                                label={'Email'}
                                margin={'normal'}
                                {...formik.getFieldProps('email')}
                            />
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            <TextField
                                {...formik.getFieldProps('password')}
                                type={'password'}
                                label={'Password'}
                                margin={'normal'}
                            />
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            <FormControlLabel

                                label={'Remember Me'}
                                control={<Checkbox{...formik.getFieldProps('rememberMe')}
                                                  checked={formik.values.rememberMe}
                                />}/>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};

