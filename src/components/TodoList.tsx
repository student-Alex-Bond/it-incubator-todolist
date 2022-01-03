import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from '../App';
import {AddItemForm} from "./AddItemFormType";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (newTaskTitle: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (title: string, id: string) => void
}

const TodoList = (props: PropsType) => {


    let ElementsLi = props.tasks.map(task => {
        const onRemoveHandler = () => {
            props.removeTask(task.id, props.id)
        }
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDone = e.currentTarget.checked
            props.changeStatus(task.id, newIsDone, props.id)
        }
        const onChangeTitleHandler = (title: string) => {
            props.changeTaskTitle(task.id, title, props.id)
        }


        return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox checked={task.isDone} onChange={onChangeStatusHandler}/>
            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>

            <IconButton aria-label ="delete" onClick={onRemoveHandler}>
                <Delete />
            </IconButton>
        </div>
    })

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }

    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }


    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <IconButton aria-label ="delete" onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <div>
                {ElementsLi}
            </div>
            <div>
                <Button variant = {props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"}  variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;