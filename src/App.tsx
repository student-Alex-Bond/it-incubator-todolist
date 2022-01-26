import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemFormType";
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

function App() {

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        tasksObj[todoListId] = tasks.filter(task => task.id !== id)

        setTasksObj({...tasksObj})
    }

    function addTask(newTaskTitle: string, todoListId: string) {

        let newTask = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        let tasks = tasksObj[todoListId]
        tasksObj[todoListId] = [newTask, ...tasks]
        setTasksObj({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }

    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find((tl) => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
        }
        setTodoLists([...todoLists])
    }

    function removeTodoList(todoList: string) {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoList)
        setTodoLists(filteredTodoList)

        delete tasksObj[todoList]
    }

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = React.useState<Array<TodoListsType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasksObj, setTasksObj] = React.useState<TaskStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "Rest Api", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId2]: [{id: v1(), title: "book", isDone: true},
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "almag", isDone: false},
            {id: v1(), title: "MacBook", isDone: false},
            {id: v1(), title: "bugatti", isDone: false},]
    })

    function addTodoList(title: string) {
        let todoList: TodoListsType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodoLists([todoList, ...todoLists])
        setTasksObj({...tasksObj, [todoList.id]: []})
    }

    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = title
            setTasksObj({...tasksObj})
        }
    }

    function changeTodoListTitle(title: string, id: string) {
        const todoList = todoLists.find(todoList => todoList.id === id)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
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
                            let tasksForTodolist = tasksObj[tl.id]

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

export default App;
