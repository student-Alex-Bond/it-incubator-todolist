import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskType} from '../../api/todoLists-api';
import {TodolistsList} from "../../features/Todolists/TodolistsList";
import {ErrorSnackbar} from "../ErrorSnackBar/ErrorSnackBar";
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import { Route, Routes} from "react-router-dom";
import {Login} from "../../features/Login/Login";
import { logoutTC } from '../../features/Login/auth-reducer';


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

type AppWithReduxType = {
    demo?: boolean
}

function AppWithRedux({demo = false}: AppWithReduxType) {

    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootState, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    const status = useSelector<AppRootState, RequestStatusType>(state => state.app.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])


    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '40%', textAlign: 'center', width: '100%'}}><CircularProgress/>
        </div>
    }

    return (

            <div className="App">
                <AppBar position={'static'}>
                    <Toolbar>
                        <ErrorSnackbar/>
                        <IconButton edge={"start"} color={"inherit"} aria-label={'menu'}>
                            <Menu/>
                        </IconButton>
                        <Typography variant={'h6'}>
                            News
                        </Typography>
                        {isLoggedIn && <Button color={'inherit'} onClick={logoutHandler}>Log Out</Button>}
                    </Toolbar>
                    <div className={"progressBar"}>{status === 'loading' && <LinearProgress/>}</div>
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList demo={demo} />} />
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                    {/*<TodolistsList demo={demo}/>*/}
                </Container>
            </div>

    );

}


export default AppWithRedux;
