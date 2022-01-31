import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todoListId1, todoListId2} from "./todolist-reducer";


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
    isDone: boolean
    todolistId: string
    taskID: string
}

export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    todolistId: string
    taskID: string
}


export type ActionsTypes = removeTaskActionType | addTaskActionType | changeStatusActionType | changeTaskTitleActionType|AddTodolistActionType | RemoveTodolistActionType

const initialState: TaskStateType = {
    [todoListId1]: [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "Rest Api", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListId2]: [{id: v1(), title: "book", isDone: true},
        {id: v1(), title: "milk", isDone: true},
        {id: v1(), title: "almag", isDone: false},
        {id: v1(), title: "MacBook", isDone: false},
        {id: v1(), title: "bugatti", isDone: false},]
}



export const tasksReducer = (state: TaskStateType = initialState, action: ActionsTypes): TaskStateType => {
    switch (action.type) {
        case "CHANGE-TASK-TITLE": {
            // const stateCopy = {...state}
            // const tasks = state[action.todolistId]
            // let task = tasks.find(t => t.id === action.taskID)
            // if(task){
            //     task.title = action.title
            // }
            // stateCopy[action.todolistId] = tasks
            // return stateCopy
            const tasks = state[action.todolistId]
            let task = tasks.find(t => t.id === action.taskID)
             if(task){
                task.title = action.title
             }
            return {...state}
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            let task = tasks.find(t => t.id === action.taskID)
            if(task){
                task.isDone = action.isDone
            }
            stateCopy[action.todolistId] = tasks
            return stateCopy
        }
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskID)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "ADD-TODOLIST":{
            const stateCopy = {...state}

            stateCopy[action.todolistId] =[]

            return stateCopy
        }
        case "REMOVE-TODOLIST":{
            const stateCopy = {...state}
            delete stateCopy[action.id]
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

export const changeTaskStatusAC = ( taskID: string, isDone: boolean, todolistId: string): changeStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        isDone,
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
