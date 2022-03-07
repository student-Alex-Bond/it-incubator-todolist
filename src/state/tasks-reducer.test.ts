import {TaskStateType} from '../AppWithRedux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';

import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";
import {TaskPriorities, TasksStatuses} from "../api/todoLists-api";

let startState: TaskStateType = {}

beforeEach(()=> {
    startState= {
        "todolistId1": [
            { id: "1", title: "CSS", status: TasksStatuses.New, todoListId: "todolistId1",
            addedDate: '', startDate: '', order: 0, priority: TaskPriorities.Low, description: '',
            deadline: ''},
            { id: "2", title: "JS", status: TasksStatuses.Completed, todoListId: "todolistId1",
                addedDate: '', startDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                deadline: ''},
            { id: "3", title: "React", status: TasksStatuses.New, todoListId: "todolistId1",
                addedDate: '', startDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                deadline: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread",status: TasksStatuses.New, todoListId: "todolistId2",
                addedDate: '', startDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                deadline: '' },
            { id: "2", title: "milk", status: TasksStatuses.Completed, todoListId: "todolistId2",
                addedDate: '', startDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                deadline: '' },
            { id: "3", title: "tea", status: TasksStatuses.New, todoListId: "todolistId2",
                addedDate: '', startDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                deadline: '' }
        ]
    };

})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    });

});

test('correct task should be added to correct array', () => {

    const action = addTaskAC("juice", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TasksStatuses.New);
})

test('new array should be added when new todolist is added', () => {


    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('status of specified task should be changed', () => {


    const action = changeTaskStatusAC("2", TasksStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TasksStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TasksStatuses.New);
});

test('title of specified task should be changed', () => {


    const action = changeTaskTitleAC("coffee", '2', "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("coffee");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});