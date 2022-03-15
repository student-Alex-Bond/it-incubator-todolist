import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TasksStatuses, TaskType} from "../../../api/todoLists-api";
import {FilterValuesType, TodolistsDomainType} from './todolist-reducer';
import {useDispatch} from "react-redux";
import {fetchTasksTC} from './tasks-reducer';


type PropsType = {
    todolist: TodolistsDomainType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (newTaskTitle: string, todoListId: string) => void
    changeStatus: (taskId: string, status: TasksStatuses, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, title: string) => void
    demo?: boolean
}

export const TodoList = React.memo(({demo = false, ...props}: PropsType) => {

    const dispatch = useDispatch()



    useEffect(() => {
        if(!demo){
            dispatch(fetchTasksTC(props.todolist.id))
        }
    }, [])


    let tasksForTodolist = props.tasks
    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TasksStatuses.New)
    }

    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TasksStatuses.Completed)
    }

    let ElementsLi = tasksForTodolist.map(task => {
        return <Task todolistID={props.todolist.id}
                     task={task}
                     removeTask={props.removeTask}
                     changeStatus={props.changeStatus}
                     changeTaskTitle={props.changeTaskTitle}
                     key={task.id}
        />
    })

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.todolist.id)
    }, [props.changeFilter, props.todolist.id])

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.todolist.id)
    }, [props.changeFilter, props.todolist.id])

    const removeTodoList = () => {
        props.removeTodoList(props.todolist.id)
    }

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.todolist.id, title)
    }, [props.changeTodoListTitle, props.todolist.id])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])


    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onChange={changeTodoListTitle}/>
                <IconButton aria-label="delete" onClick={removeTodoList} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}  disabled={props.todolist.entityStatus === 'loading'}/>

            <div>
                {ElementsLi}
            </div>
            <div>
                <Button variant={props.todolist.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
})


export default TodoList;