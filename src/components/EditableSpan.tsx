import React, { ChangeEvent } from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
    let [editMode, setEditMode] = React.useState(false)
    let [title, setTitle] = React.useState(props.title)

    const activeEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activeViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (editMode
            ? <TextField onBlur={activeViewMode} value={title} autoFocus
            onChange={onChangeTitleHandler}
            /> // при использовании инпута всегда должен быть параметр autoFocus
            : <span onDoubleClick={activeEditMode}>{props.title}</span>
    )

})

export default EditableSpan;