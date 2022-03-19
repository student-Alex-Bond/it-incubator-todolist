import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {tasksReducer} from '../features/Todolists/Todolist/tasks-reducer'
import {todoListReducer as todoListsReducer} from '../features/Todolists/Todolist/todolist-reducer'
import {v1} from 'uuid'
import {AppRootState} from '../components/App/store'
import {TaskPriorities, TasksStatuses} from "../api/todoLists-api";
import {appReducer} from "../components/App/app-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer
})

const initialGlobalState: AppRootState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: '', entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: '', entityStatus: 'loading'}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TasksStatuses.New,
                addedDate: '', deadline: '', description: '', startDate: '', order: 0,
                priority: TaskPriorities.Low, todoListId: 'todolistId1'
            },
            {
                id: v1(), title: "JS", status: TasksStatuses.New,
                addedDate: '', deadline: '', description: '', startDate: '', order: 0,
                priority: TaskPriorities.Low, todoListId: 'todolistId1'
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TasksStatuses.New,
                addedDate: '', deadline: '', description: '', startDate: '', order: 0,
                priority: TaskPriorities.Low, todoListId: 'todolistId2'
            },
            {
                id: v1(), title: "React Book", status: TasksStatuses.New,
                addedDate: '', deadline: '', description: '', startDate: '', order: 0,
                priority: TaskPriorities.Low, todoListId: 'todolistId2'
            }
        ]
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));
export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

