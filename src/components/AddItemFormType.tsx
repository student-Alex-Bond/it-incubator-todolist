import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (newTaskTitle: string) => void

}

export function AddItemForm(props: AddItemFormType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13 && newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle);
            setNewTaskTitle("");
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            return setError('Title is required')
        }
        props.addItem(newTaskTitle.trim());//метод trim() обрезает пробелы в начале и конце стороки
        setNewTaskTitle("");

        {/*очищение поля инпута setNewTaskTitle("") */
        }

    }

    return (
        <div>
            <input className={error ? 'error' : ''} value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}