import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";


export type ActionType = {
    type: string
    [key: string]: any
}

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string

}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType

}

export type ActionsTypes =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export let todoListId1 = v1()
export let todoListId2 = v1()

const initialState: Array<TodoListsType> = []


export const todoListReducer = (state: Array<TodoListsType> = initialState, action: ActionsTypes): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST' : {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            // const todoList = state.find(todoList => todoList.id === action.id)
            // if (todoList) {
            //     todoList.title = action.title
            // }
            // return [...state]
            return state.map(tl => tl.id === action.id
                ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
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
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistId: v1()
    }
}
export const changeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    }
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    }
}