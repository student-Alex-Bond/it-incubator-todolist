import {TaskStateType} from "../../../components/App/AppWithRedux";

import {addTodolistAC, todoListReducer, TodolistsDomainType} from "./todolist-reducer";
import { tasksReducer } from "./tasks-reducer";
import {TodolistType} from "../../../api/todoLists-api";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistsDomainType> = [];

    let todolist: TodolistType = {
        id: 'any id',
        order: 0,
        addedDate: '',
        title: 'new todolist'
    }

    const action = addTodolistAC({todolist: todolist} );
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});