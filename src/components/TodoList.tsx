import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from '../App';
import {AddItemForm} from "./AddItemFormType";
import EditableSpan from "./EditableSpan";


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


        return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <input type='checkbox' checked={task.isDone} onChange={onChangeStatusHandler}/>
            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
            <button onClick={onRemoveHandler}>X</button>
        </li>
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
                <button onClick={removeTodoList}>X</button>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {ElementsLi}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;