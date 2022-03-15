import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from "./todolist-reducer";
import {TaskPriorities, TasksStatuses, TaskType, todoListsApi, UpdateTaskType} from '../../../api/todoLists-api'
import {TaskStateType} from "../../../components/App/AppWithRedux";
import {Dispatch} from "redux";
import {AppRootState} from "../../../components/App/store";
import {setAppErrorAC, SetAppErrorType, setAppStatusAC, SetAppStatusType} from "../../../components/App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";


const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsTypes): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
            // const stateCopy = {...state}
            // const newTask: TaskType = action.task
            // const tasks = stateCopy[newTask.todoListId]
            // const newTasks = [newTask, ...tasks]
            // stateCopy[newTask.todoListId] = newTasks
            // return stateCopy
        }
        case "UPDATE-TASK": {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskID
                        ? {...task, ...action.model}
                        : task)
            }
            // let todolistTasks = state[action.todolistId]
            // state[action.todolistId] = todolistTasks.map(task => task.id === action.taskID
            //     ? {...task, ...action.model}
            //     : task)
            // return {...state}
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskID)
            }
            // const stateCopy = {...state}
            // const tasks = state[action.todolistId]
            // const filteredTasks = tasks
            // stateCopy[action.todolistId] = filteredTasks
            // return stateCopy
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []}
            // const stateCopy = {...state}
            // stateCopy[action.todolist.id] = []
            // return stateCopy
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
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        //     const stateCopy = {...state}
        //     stateCopy[action.todolistId] = action.tasks
        //     return stateCopy

        default:
            return state
    }
}
// actions
export const removeTaskAC = (taskID: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    todolistId: todolistId,
    taskID: taskID
} as const)
// паттерн фабричная функция
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)

export const updateTaskAC = (taskID: string, model: UpdateDomainTaskType, todolistId: string) => {
    return {
        type: 'UPDATE-TASK',
        model,
        todolistId,
        taskID
    } as const
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {
        type: "SET-TASKS",
        tasks: tasks,
        todolistId: todolistId
    } as const
}

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setAppStatusAC('loading'))
    todoListsApi.getTasks(todolistId).then((res) => {
        dispatch(setTasksAC(res.data.items, todolistId))
        dispatch(setAppStatusAC('succeeded'))
    })
}

export const removeTaskTC = (taskId: string, todoListId: string) => (dispatch: Dispatch<ActionsTypes>) => {
    todoListsApi.deleteTask(todoListId, taskId).then((res) => {
        dispatch(removeTaskAC(taskId, todoListId))
    })
}

export const addTaskTC = (newTaskTitle: string, todoListId: string) => (dispatch: Dispatch<ActionsTypes | SetAppErrorType>) => {
    dispatch(setAppStatusAC('loading'))
    todoListsApi.createTask(todoListId, newTaskTitle).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskType, todoListId: string) =>
    (dispatch: ThunkType, getState: () => AppRootState) => {

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
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, domainModel, todoListId))
                } else {
                    handleServerAppError(res.data, dispatch)

                }
            }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }


//types
export type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type ActionType = {
    type: string
    [key: string]: any
}

export type ThunkType = Dispatch<ActionsTypes | SetAppStatusType | SetAppErrorType>

export type ActionsTypes =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | ReturnType<typeof setTasksAC>
    | SetAppStatusType
