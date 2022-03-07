import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../state/tasks-reducer'
import {todoListReducer as todoListsReducer} from '../state/todolist-reducer'
import {v1} from 'uuid'
import {AppRootState} from '../state/store'
import {TaskPriorities, TasksStatuses} from "../api/todoLists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState: AppRootState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: ''}
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
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);
export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

