import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType,} from "./todolist-reducer";
import {TaskPriorities, TasksStatuses, TaskType} from '../api/todoLists-api'
import {TaskStateType} from "../AppWithRedux";

export type ActionType = {
    type: string
    [key: string]: any
}

export type removeTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskID: string
}
export type addTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type changeStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    status: TasksStatuses
    todolistId: string
    taskID: string
}

export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    todolistId: string
    taskID: string
}


export type ActionsTypes = removeTaskActionType
    | addTaskActionType
    | changeStatusActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType

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
        case "SET-TODOLISTS":{
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })

            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistId: string): removeTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        todolistId: todolistId,
        taskID: taskID
    }
}

// паттерн фабричная функция
export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    }
}

export const changeTaskStatusAC = (taskID: string, status: TasksStatuses, todolistId: string): changeStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        status,
        todolistId,
        taskID
    }
}

export const changeTaskTitleAC = (title: string, taskID: string, todolistId: string): changeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        title,
        todolistId,
        taskID
    }
}

