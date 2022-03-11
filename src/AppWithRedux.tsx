import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    FilterValuesType, TodolistsDomainType, fetchTodolistsTC,

} from "./state/todolist-reducer";
import { TaskType, TasksStatuses } from './api/todoLists-api';


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {


    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodolistsDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)

    useEffect(()=>{
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    }, [dispatch])

    const addTask = useCallback((newTaskTitle: string, todoListId: string) => {
        dispatch(addTaskAC(newTaskTitle, todoListId))
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, status: TasksStatuses, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, status, todoListId))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
     dispatch(changeTodolistFilterAC(value, todoListId))
    }, [dispatch])

    const removeTodoList = useCallback((todoList: string)=> {
      dispatch(removeTodolistAC(todoList))
    }, [dispatch])


    const addTodoList = useCallback((title: string) => {
    dispatch(addTodolistAC(title))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, title: string, todoListId: string) => {
      dispatch(changeTaskTitleAC(title, taskId, todoListId))
    }, [dispatch])

     const changeTodoListTitle = useCallback((title: string, id: string) =>{
       dispatch(changeTodolistTitleAC(title, id))
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>

                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map((tl) => {
                            let tasksForTodolist = tasks[tl.id]

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList title={tl.title}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeStatus={changeStatus}
                                              filter={tl.filter}
                                              id={tl.id}
                                              key={tl.id}
                                              removeTodoList={removeTodoList}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );

}

export default AppWithRedux;
