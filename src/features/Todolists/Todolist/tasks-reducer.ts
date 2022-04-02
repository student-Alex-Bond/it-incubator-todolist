import {TaskPriorities, TaskType, todoListsApi, UpdateTaskType} from '../../../api/todoLists-api'
import {TaskStateType} from "../../../components/App/AppWithRedux";
import {Dispatch} from "redux";
import {AppRootState} from "../../../components/App/store";
import {setAppStatusAC} from "../../../components/App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolist-reducer";


const initialState: TaskStateType = {}

export const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskID: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ taskID: string, model: UpdateDomainTaskType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => state[tl.id] = [])
        })
    }
})


export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions

export const tasksReducer = slice.reducer
//
//     (state: TaskStateType = initialState, action: ActionsTypes): TaskStateType => {
//     switch (action.type) {
//         case "ADD-TASK": {
//             return {
//                 ...state,
//                 [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
//             }
//             // const stateCopy = {...state}
//             // const newTask: TaskType = action.task
//             // const tasks = stateCopy[newTask.todoListId]
//             // const newTasks = [newTask, ...tasks]
//             // stateCopy[newTask.todoListId] = newTasks
//             // return stateCopy
//         }
//         case "UPDATE-TASK": {
//             return {
//                 ...state, [action.todolistId]: state[action.todolistId]
//                     .map(task => task.id === action.taskID
//                         ? {...task, ...action.model}
//                         : task)
//             }
//             // let todolistTasks = state[action.todolistId]
//             // state[action.todolistId] = todolistTasks.map(task => task.id === action.taskID
//             //     ? {...task, ...action.model}
//             //     : task)
//             // return {...state}
//         }
//         case "REMOVE-TASK": {
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskID)
//             }
//             // const stateCopy = {...state}
//             // const tasks = state[action.todolistId]
//             // const filteredTasks = tasks
//             // stateCopy[action.todolistId] = filteredTasks
//             // return stateCopy
//         }
//         case "ADD-TODOLIST": {
//             return {...state, [action.todolist.id]: []}
//             // const stateCopy = {...state}
//             // stateCopy[action.todolist.id] = []
//             // return stateCopy
//         }
//         case "REMOVE-TODOLIST": {
//             const stateCopy = {...state}
//             delete stateCopy[action.id]
//             return stateCopy
//         }
//         case "SET-TODOLISTS": {
//             const stateCopy = {...state}
//             action.todolists.forEach(tl => {
//                 stateCopy[tl.id] = []
//             })
//             return stateCopy
//         }
//         case "SET-TASKS":
//             return {...state, [action.todolistId]: action.tasks}
//         //     const stateCopy = {...state}
//         //     stateCopy[action.todolistId] = action.tasks
//         //     return stateCopy
//
//         default:
//             return state
//     }
// }
// // actions
// export const removeTaskAC = (taskID: string, todolistId: string) => ({
//     type: 'REMOVE-TASK',
//     todolistId: todolistId,
//     taskID: taskID
// } as const)
// // паттерн фабричная функция
// export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
//
// export const updateTaskAC = (taskID: string, model: UpdateDomainTaskType, todolistId: string) => {
//     return {
//         type: 'UPDATE-TASK',
//         model,
//         todolistId,
//         taskID
//     } as const
// }
//
// export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
//     return {
//         type: "SET-TASKS",
//         tasks: tasks,
//         todolistId: todolistId
//     } as const
// }

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todoListsApi.getTasks(todolistId).then((res) => {
        dispatch(setTasksAC({tasks: res.data.items, todolistId: todolistId}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    })
}

export const removeTaskTC = (taskId: string, todoListId: string) => (dispatch: Dispatch) => {
    todoListsApi.deleteTask(todoListId, taskId).then(() => {
        dispatch(removeTaskAC({taskID: taskId, todolistId: todoListId}))
    })
}

export const addTaskTC = (newTaskTitle: string, todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todoListsApi.createTask(todoListId, newTaskTitle).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC({task: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskType, todoListId: string) =>
    (dispatch: Dispatch, getState: () => AppRootState) => {

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
                    dispatch(updateTaskAC({taskID: taskId, model: domainModel, todolistId: todoListId}))
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

// export type ActionType = {
//     type: string
//     [key: string]: any
// }
//
//  export type ThunkType = Dispatch<ActionsTypes >
//
// export type ActionsTypes =
//     | ReturnType<typeof removeTaskAC>
//     | ReturnType<typeof addTaskAC>
//     | ReturnType<typeof updateTaskAC>
//     | ReturnType<typeof setTasksAC>

