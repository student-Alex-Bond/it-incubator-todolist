import {Task} from "../components/Task";
import React from "react";
import {action} from '@storybook/addon-actions'

export default {
    title: 'My Stories/Task Component',
    component: Task
}

const removeTaskCallback = action('remove task')
const changeStatusCallback = action('Status Changed')
const changeTaskTitleCallback = action('Task changed')

export const TaskBaseExample = () => {
    return <>
        <Task todolistID={"TodoListID1"}
              task={{id: '1', isDone: true, title: 'CSS'}}
              removeTask={removeTaskCallback}
              changeStatus={changeStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}/>

        <Task todolistID={"TodoListID2"}
              task={{id: '2', isDone: false, title: 'HTML'}}
              removeTask={removeTaskCallback}
              changeStatus={changeStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}/>

    </>
}