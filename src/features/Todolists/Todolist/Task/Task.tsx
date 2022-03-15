import {TasksStatuses, TaskType} from "../../../../api/todoLists-api";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    todolistID: string
    task: TaskType
    removeTask: (taskId: string, todoListId: string) => void
    changeStatus: (taskId: string, status: TasksStatuses, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistID)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatus = e.currentTarget.checked
        props.changeStatus(props.task.id, newStatus? TasksStatuses.Completed : TasksStatuses.New, props.todolistID)
    }
    const onChangeTitleHandler = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistID)
    }, [props.task.id, props.changeTaskTitle, props.todolistID ])


    return <div key={props.task.id} className={props.task.status === TasksStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TasksStatuses.Completed}
            color="primary"
            onChange={onChangeStatusHandler}
        />
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>

        <IconButton aria-label="delete" onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
})