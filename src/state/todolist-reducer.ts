import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";


export type ActionType ={
    type: string
    [key: string]: any
}

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType ={
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType ={
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string

}
export type ChangeTodolistFilterActionType ={
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType

}

export type ActionsTypes = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


export const todoListReducer = (state: Array<TodoListsType>, action: ActionsTypes): Array<TodoListsType> => {
    switch(action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(tl => tl.id !=action.id)
        }
        case 'ADD-TODOLIST' : {
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }]
        }
        case 'CHANGE-TODOLIST-TITLE':{
            const todoList = state.find(todoList => todoList.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER':{
            const todoList = state.find(todoList => todoList.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }

        default:
            throw new Error("I don't understand this action type")
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
export const changeTodolistTitleAC = (title: string, id: string ): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    }
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string ): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    }
}