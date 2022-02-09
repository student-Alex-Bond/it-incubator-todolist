import {TaskType} from "../App";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    todolistID: string
    task: TaskType
    removeTask: (taskId: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistID)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDone = e.currentTarget.checked
        props.changeStatus(props.task.id, newIsDone, props.todolistID)
    }
    const onChangeTitleHandler = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistID)
    }, [props.task.id, props.changeTaskTitle, props.todolistID ])


    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeStatusHandler}
        />
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>

        <IconButton aria-label="delete" onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
})