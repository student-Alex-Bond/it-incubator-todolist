import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {AddItemForm} from "./components/AddItemFormType";
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";

export type TaskType = {
    title: string,
    isDone: boolean,
    id: string
}
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {


    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodoListsType>>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)

    function removeTask(id: string, todoListId: string) {
        dispatch(removeTaskAC(id, todoListId))
    }

    function addTask(newTaskTitle: string, todoListId: string) {
        dispatch(addTaskAC(newTaskTitle, todoListId))
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
     dispatch(changeTodolistFilterAC(value, todoListId))
    }

    function removeTodoList(todoList: string) {
      dispatch(removeTodolistAC(todoList))
    }


    function addTodoList(title: string) {
    dispatch(addTodolistAC(title))
    }

    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
      dispatch(changeTaskTitleAC(title, taskId, todoListId))
    }

    function changeTodoListTitle(title: string, id: string) {
       dispatch(changeTodolistTitleAC(title, id))
    }

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

                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                            }

                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                            }

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
