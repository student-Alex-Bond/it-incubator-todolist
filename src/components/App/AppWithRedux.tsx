import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskType} from '../../api/todoLists-api';
import {TodolistsList} from "../../features/Todolists/TodolistsList";
import {ErrorSnackbar} from "../ErrorSnackBar/ErrorSnackBar";
import {useSelector} from 'react-redux';
import {AppRootState} from "./store";
import {RequestStatusType} from "./app-reducer";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

type AppWithReduxType ={
     demo?: boolean
}

function AppWithRedux({demo = false}: AppWithReduxType) {

    const status = useSelector<AppRootState, RequestStatusType>(state => state.app.status)

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
                    <Button color={'inherit'}>Login</Button>

                </Toolbar>
                <div className={"progressBar"}>{ status === 'loading' && <LinearProgress/> }</div>
            </AppBar>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );

}


export default AppWithRedux;
