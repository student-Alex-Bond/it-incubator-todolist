import {combineReducers, createStore} from "redux";
import {todoListReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";


const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})

// type AppRootState ={
//     todoLists: Array<TodoListsType>
//     tasks: TaskStateType
// } описание типов в ручную

export type AppRootState = ReturnType<typeof store.getState> // автоматически typescript выводит типы на основе возврашаемого значения функции rootReducer

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store

