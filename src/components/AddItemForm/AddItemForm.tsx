import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemForm = {
    addItem: (newTaskTitle: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemForm) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13 && newTaskTitle.trim() !== '') {
            addItem(newTaskTitle);
            setNewTaskTitle("");
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            return setError('Title is required')
        }
        addItem(newTaskTitle.trim());//метод trim() обрезает пробелы в начале и конце стороки
        setNewTaskTitle("");

        /*очищение поля инпута setNewTaskTitle("") */

    }

    return (
        <div>
            {/*<input className={error ? 'error' : ''} value={newTaskTitle}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*/>*/}
            <TextField variant={"outlined"} error={!!error} value={newTaskTitle}
                       disabled={disabled}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       label={"Type value "}
                       helperText={error}
            />
            <IconButton onClick={addTask} color={"primary"} disabled={disabled}>
                <ControlPoint/>
            </IconButton>

        </div>
    )
})