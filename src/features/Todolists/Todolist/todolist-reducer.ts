import {todoListsApi, TodolistType} from "../../../api/todoLists-api";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    setAppStatusAC,
} from "../../../components/App/app-reducer";
import {handleServerNetworkError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistsDomainType> = []

export const slice = createSlice({
    name: 'todoList',
    initialState: initialState,
    reducers: {
        removeTodolistAC: (state, action: PayloadAction<{todolistId: string}>)=> {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if(index > -1){
                state.splice(index, 1)
            }
        },
        addTodolistAC: (state, action: PayloadAction<{todolist: TodolistType}>)=> {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC: (state, action: PayloadAction<{id: string, title: string}>)=> {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC: (state, action: PayloadAction<{filter: FilterValuesType, id: string}>)=> {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC: (state, action: PayloadAction<{id: string, status: RequestStatusType}>)=> {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        setTodolistsAC: (state, action: PayloadAction<{todolists: Array<TodolistType>}>)=> {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        },
    }
})

export const {removeTodolistAC, addTodolistAC, changeTodolistEntityStatusAC, changeTodolistTitleAC,
    changeTodolistFilterAC, setTodolistsAC
} = slice.actions

export const todoListReducer = slice.reducer
//     (state: Array<TodolistsDomainType> = initialState, action: ActionsTypes): Array<TodolistsDomainType> => {
//     switch (action.type) {
//         case 'REMOVE-TODOLIST' :
//             return state.filter(tl => tl.id != action.id)
//         case 'ADD-TODOLIST' :
//             return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
//         case 'CHANGE-TODOLIST-TITLE':
//             // const todoList = state.find(todoList => todoList.id === action.id)
//             // if (todoList) {
//             //     todoList.title = action.title
//             // }
//             // return [...state]
//             return state.map(tl => tl.id === action.id
//                 ? {...tl, title: action.title} : tl)
//         case 'CHANGE-TODOLIST-FILTER':
//             // const todoList = state.find(todoList => todoList.id === action.id)
//             // if (todoList) {
//             //     todoList.filter = action.filter
//             // }
//             //return [...state,]
//             return state.map(
//                 (tl) => tl.id === action.id
//                     ? {...tl, filter: action.filter}
//                     : tl
//             )
//         case "CHANGE-TODOLIST-ENTITY-STATUS":
//             return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
//
//         case "SET-TODOLISTS":
//             return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
//
//         default:
//             return state
//     }
// }
// actions
// export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
//
// export const addTodolistAC = (todolist: TodolistType) => {
//     return {
//         type: 'ADD-TODOLIST',
//         todolist
//     } as const
// }
//
// export const changeTodolistTitleAC = (id: string, title: string) => {
//     return {
//         type: 'CHANGE-TODOLIST-TITLE',
//         id: id,
//         title: title
//     } as const
// }
//
// export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => {
//     return {
//         type: 'CHANGE-TODOLIST-FILTER',
//         id: id,
//         filter: filter
//     } as const
// }
//
// export const changeTodolistEntityStatusAC = ( id: string, status: RequestStatusType) => {
//     return {
//         type: 'CHANGE-TODOLIST-ENTITY-STATUS',
//         id,
//         status
//     } as const
// }
//
// export const setTodolistsAC = (todolists: Array<TodolistType>) => {
//     return {
//         type: 'SET-TODOLISTS',
//         todolists: todolists
//     } as const
// }

// thunk
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        todoListsApi.getTodoList().then((res) => {
            dispatch(setTodolistsAC({todolists: res.data}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}

export const removeTodolistTC = (todoListID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        dispatch(changeTodolistEntityStatusAC({id: todoListID, status: 'loading'}))
        todoListsApi.deleteTodolist(todoListID).then(() => {
            dispatch(removeTodolistAC({todolistId: todoListID}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        todoListsApi.createTodolist(title).then((res) => {
            dispatch(addTodolistAC({todolist: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
    }
}

export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.updateTodolist(id, title).then(() => {
            dispatch(changeTodolistTitleAC({id: id, title: title}))
        })
    }
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>
export type changeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>
//
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

// type ThunkDispatchType = Dispatch<ActionsTypes >

