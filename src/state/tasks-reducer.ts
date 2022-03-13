import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from "./todolist-reducer";
import {TaskPriorities, TasksStatuses, TaskType, todoListsApi, UpdateTaskType} from '../api/todoLists-api'
import {TaskStateType} from "../AppWithRedux";
import {Dispatch} from "redux";
import {AppRootState} from "./store";

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
    task: TaskType
}
export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    model: UpdateDomainTaskType
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
    | UpdateTaskActionType
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
            const newTask: TaskType = action.task
            const tasks = stateCopy[newTask.todoListId]
            const newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy
        }
        case "UPDATE-TASK": {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks.map(task => task.id === action.taskID
                ? {...task, ...action.model}
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

            stateCopy[action.todolist.id] = []

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
            return stateCopy
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
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        task
    }
}

export const updateTaskAC = (taskID: string, model: UpdateDomainTaskType, todolistId: string): UpdateTaskActionType => {
    return {
        type: 'UPDATE-TASK',
        model,
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

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
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

export const removeTaskTC = (taskId: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.deleteTask(todoListId, taskId).then((res) => {
            dispatch(removeTaskAC(taskId, todoListId))
        })
    }
}

export const addTaskTC = (newTaskTitle: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.createTask(todoListId, newTaskTitle).then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
    }
}


export type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskType, todoListId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {

        const state = getState()
        const task = state.tasks[todoListId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error('task not found in the state')
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskType = {
            title: task.title,
            status: task.status,
            startDate: task.startDate,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            ...domainModel
        }
        todoListsApi.updateTask(todoListId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(taskId, domainModel, todoListId))
            })
    }
}

