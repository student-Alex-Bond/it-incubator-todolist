import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListReducer} from "../../features/Todolists/Todolist/todolist-reducer";
import {tasksReducer} from "../../features/Todolists/Todolist/tasks-reducer";
import thunk from 'redux-thunk'
import {appReducer} from "./app-reducer";
import {authReducer} from "../../features/Login/auth-reducer";


const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

// type AppRootState ={
//     todoLists: Array<TodoListsType>
//     tasks: TaskStateType
// } описание типов в ручную

export type AppRootState = ReturnType<typeof store.getState> // автоматически typescript выводит типы на основе возврашаемого значения функции rootReducer

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store

