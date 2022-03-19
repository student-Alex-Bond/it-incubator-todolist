import {v1} from "uuid";
import {todoListsApi, TodolistType} from "../../../api/todoLists-api";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    SetAppErrorType,
    setAppStatusAC,
    SetAppStatusType
} from "../../../components/App/app-reducer";
import {handleServerNetworkError} from "../../../utils/error-utils";

const initialState: Array<TodolistsDomainType> = []

export const todoListReducer = (state: Array<TodolistsDomainType> = initialState, action: ActionsTypes): Array<TodolistsDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST' :
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            // const todoList = state.find(todoList => todoList.id === action.id)
            // if (todoList) {
            //     todoList.title = action.title
            // }
            // return [...state]
            return state.map(tl => tl.id === action.id
                ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            // const todoList = state.find(todoList => todoList.id === action.id)
            // if (todoList) {
            //     todoList.filter = action.filter
            // }
            //return [...state,]
            return state.map(
                (tl) => tl.id === action.id
                    ? {...tl, filter: action.filter}
                    : tl
            )
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)

        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))

        default:
            return state
    }
}
// actions
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)

export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    } as const
}

export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    } as const
}

export const changeTodolistEntityStatusAC = ( id: string, status: RequestStatusType) => {
    return {
        type: 'CHANGE-TODOLIST-ENTITY-STATUS',
        id,
        status
    } as const
}

export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {
        type: 'SET-TODOLISTS',
        todolists: todolists
    } as const
}

// thunk
export const fetchTodolistsTC = () => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        todoListsApi.getTodoList().then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}

export const removeTodolistTC = (todoListID: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todoListID, 'loading'))
        todoListsApi.deleteTodolist(todoListID).then(() => {
            dispatch(removeTodolistAC(todoListID))
            dispatch(setAppStatusAC('succeeded'))
        })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        todoListsApi.createTodolist(title).then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
    }
}

export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: ThunkDispatchType) => {
        todoListsApi.updateTodolist(id, title).then(() => {
            dispatch(changeTodolistTitleAC(id, title))
        })
    }
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>
export type changeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>

export type ActionsTypes =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistActionType
    | changeTodolistEntityStatusACType


export type FilterValuesType = "all" | "active" | "completed"

export type TodolistsDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

type ThunkDispatchType = Dispatch<ActionsTypes | SetAppStatusType | SetAppErrorType>

