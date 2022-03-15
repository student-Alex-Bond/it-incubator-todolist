import {Task} from "../features/Todolists/Todolist/Task/Task";
import React from "react";
import {action} from '@storybook/addon-actions'
import {TaskPriorities, TasksStatuses} from "../api/todoLists-api";

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
              task={{id: '1', status: TasksStatuses.Completed, title: 'CSS',
                  todoListId: "TodoListID1",order:0, priority: TaskPriorities.Low, startDate:'',
              deadline:'', description:'',addedDate:''}}
              removeTask={removeTaskCallback}
              changeStatus={changeStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}/>

        <Task todolistID={"TodoListID2"}
              task={{id: '2', status: TasksStatuses.New, title: 'HTML',
                  todoListId: "TodoListID1",order:0, priority: TaskPriorities.Low, startDate:'',
                  deadline:'', description:'',addedDate:''}}
              removeTask={removeTaskCallback}
              changeStatus={changeStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}/>

    </>
}