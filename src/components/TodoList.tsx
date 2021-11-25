import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from '../App';

type PropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTaskTitle: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

const TodoList = (props: PropsType) => {


    let ElementsLi = props.tasks.map(task => {
        const onRemoveHandler = () => {
            props.removeTask(task.id)
        }
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let isDone = e.currentTarget.checked
            props.changeStatus(task.id, isDone)
        }

        return <li key={task.id} className={task.isDone? 'is-done': ''}>
            <input type='checkbox' checked={task.isDone}
                   onChange={onChangeHandler}
            /> <span>{task.title}</span>
            <button onClick={onRemoveHandler}>X</button>
        </li>
    })

    const [newTaskTitle, setNewTaskTitle] = useState("")

    let [error, setError ] = useState<string|null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13 && newTaskTitle.trim() !=='') {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }

    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            return setError('Title is required')
        }
        props.addTask(newTaskTitle.trim());//метод trim() обрезает пробелы в начале и конце стороки
        setNewTaskTitle("");

        {/*очищение поля инпута setNewTaskTitle("") */
        }

    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ?  'error': ''} value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {ElementsLi}
            </ul>
            <div>
                <button className={props.filter === 'all' ?'active-filter': ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ?'active-filter': ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ?'active-filter': ''}onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;