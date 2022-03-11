import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistActionType

} from "./todolist-reducer";
import {TaskPriorities, TasksStatuses, TaskType, todoListsApi, TodolistType} from '../api/todoLists-api'
import {TaskStateType} from "../AppWithRedux";
import {Dispatch} from "redux";

export type ActionType = {
    type: string
    [key: string]: any
}

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    status: TasksStatuses
    todolistId: string
    taskID: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    todolistId: string
    taskID: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>,
    todolistId: string
}


export type ActionsTypes = RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTasksActionType

const initialState: TaskStateType = {}


export const tasksReducer = (state: TaskStateType = initialState, action: ActionsTypes): TaskStateType => {
    switch (action.type) {
        case "CHANGE-TASK-TITLE": {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks.map(task => task.id === action.taskID
                ? {...task, title: action.title}
                : task)
            return {...state}

        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask: TaskType = {
                id: v1(), title: action.title, status: TasksStatuses.New,
                addedDate: '', deadline: '', description: '', startDate: '', order: 0,
                priority: TaskPriorities.Low, todoListId: action.todolistId
            }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks.map(task => task.id === action.taskID
                ? {...task, status: action.status}
                : task)
            return {...state}
        }
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskID)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}

            stateCopy[action.todolistId] = []

            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })

            return stateCopy
        }
        case "SET-TASKS": {
            const stateCopy = {...state}

            stateCopy[action.todolistId] = action.tasks
            return  stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        todolistId: todolistId,
        taskID: taskID
    }
}

// паттерн фабричная функция
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    }
}

export const changeTaskStatusAC = (taskID: string, status: TasksStatuses, todolistId: string): ChangeStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        status,
        todolistId,
        taskID
    }
}

export const changeTaskTitleAC = (title: string, taskID: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        title,
        todolistId,
        taskID
    }
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType =>  {
    return {
        type: "SET-TASKS",
        tasks: tasks,
        todolistId: todolistId
    }
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.getTasks(todolistId).then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
    }
}

