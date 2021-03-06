import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../components/App/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistsDomainType
} from "./Todolist/todolist-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./Todolist/tasks-reducer";
import {TasksStatuses} from "../../api/todoLists-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import TodoList from "./Todolist/TodoList";
import {TaskStateType} from "../../components/App/AppWithRedux";
import {Navigate} from 'react-router-dom'

export  type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo = false}) => {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistsDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)

    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskTC(id, todoListId))
    }, [dispatch])


    const addTask = useCallback((newTaskTitle: string, todoListId: string) => {
        dispatch(addTaskTC(newTaskTitle, todoListId))
    }, [dispatch])


    const changeStatus = useCallback((taskId: string, status: TasksStatuses, todoListId: string) => {
        dispatch(updateTaskTC(taskId, {status}, todoListId))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, title: string, todoListId: string) => {
        dispatch(updateTaskTC(taskId, {title}, todoListId))
    }, [dispatch])


    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        dispatch(changeTodolistFilterAC({filter: value, id: todoListId}))
    }, [dispatch])


    const removeTodoList = useCallback((todoList: string) => {
        dispatch(removeTodolistTC(todoList))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const changeTodoListTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleTC(id, title))
    }, [dispatch])

    if(!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <TodoList
                                todolist={tl}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                key={tl.id}
                                removeTodoList={removeTodoList}
                                changeTaskTitle={changeTaskTitle}
                                changeTodoListTitle={changeTodoListTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}