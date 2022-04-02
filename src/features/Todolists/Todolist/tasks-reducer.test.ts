import {TaskStateType} from '../../../components/App/AppWithRedux';
import {
    addTaskAC,
    updateTaskAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from './tasks-reducer';

import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolist-reducer";
import {TaskPriorities, TasksStatuses, TaskType} from "../../../api/todoLists-api";

let startState: TaskStateType = {}

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TasksStatuses.New, todoListId: "todolistId1",
                addedDate: '', startDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                deadline: ''
            },
            {
                id: "2", title: "JS", status: TasksStatuses.Completed, todoListId: "todolistId1",
                addedDate: '', startDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                deadline: ''
            },
            {
                id: "3", title: "React", status: TasksStatuses.New, todoListId: "todolistId1",
                addedDate: '', startDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                deadline: ''
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TasksStatuses.New, todoListId: "todolistId2",
                addedDate: '', startDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                deadline: ''
            },
            {
                id: "2", title: "milk", status: TasksStatuses.Completed, todoListId: "todolistId2",
                addedDate: '', startDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                deadline: ''
            },
            {
                id: "3", title: "tea", status: TasksStatuses.New, todoListId: "todolistId2",
                addedDate: '', startDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                deadline: ''
            }
        ]
    };

})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC({taskID: "2",  todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    });

});

test('correct task should be added to correct array', () => {

    let task: TaskType = {
        todoListId: "todolistId2",
        title: 'juice',
        status: TasksStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
        id: 'ffgfgg'

    }

    const action = addTaskAC({task});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TasksStatuses.New);
})

test('new array should be added when new todolist is added', () => {


    let todolist = {id: "blabla", addedDate: '', order: 0, title: 'new todolist'}

    const action = addTodolistAC({todolist});

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


    const action = updateTaskAC({taskID:"2", model: {status: TasksStatuses.New}, todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TasksStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TasksStatuses.New);
});


test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC({todolistId: "todolistId2"});
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});

test('empty arrays should be added wgen we set todolists', () => {

    const action = setTodolistsAC({todolists: [
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 2', order: 0, addedDate: ''}
    ]})

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])


});

test('tasks should be added for todolist', () => {

    const action = setTasksAC({tasks: startState["todolistId1"], todolistId: "todolistId1"})

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)


    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)


});