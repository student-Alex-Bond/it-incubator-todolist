import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListReducer, TodolistsDomainType
} from "./todolist-reducer";
import {v1} from "uuid";



let todoListId1: string
let todoListId2: string
let startState: Array<TodolistsDomainType> = []

beforeEach(() => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    startState = [
        {id: todoListId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todoListId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]

})

test('correct todolist should be removed', () => {


    const endState = todoListReducer(startState, removeTodolistAC(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todoListReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('all')

})

test('correct todolist should change its name', () => {
    const newTodolistTitle = "What to learn"

    const action = changeTodolistTitleAC(newTodolistTitle, todoListId2)

    const endState = todoListReducer(startState, action)


    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)

})

test('correct filter of todolist should  be changed', () => {

    const newFilter = "all"

    const action = changeTodolistFilterAC(newFilter, todoListId2)

    const endState = todoListReducer(startState, action)


    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)

})