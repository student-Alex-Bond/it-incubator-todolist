import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListReducer
} from "./todolist-reducer";
import {v1} from "uuid";
import {FilterValuesType, TodoListsType} from "../App";


test('correct todolist should be removed', ()=>{
     let todoListId1 = v1()
     let todoListId2 = v1()

    const startState:Array<TodoListsType>  =[
        {id: todoListId1, title: "What to learn", filter: "all" },
        {id: todoListId2, title: "What to buy", filter: "all" }
    ]


    const endState = todoListReducer(startState, removeTodolistAC(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', ()=>{
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState:Array<TodoListsType>  =[
        {id: todoListId1, title: "What to learn", filter: "all" },
        {id: todoListId2, title: "What to buy", filter: "all" }
    ]


    const endState = todoListReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('all')

})

test('correct todolist should change its name', ()=>{
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState:Array<TodoListsType>  =[
        {id: todoListId1, title: "What to learn", filter: "all" },
        {id: todoListId2, title: "What to buy", filter: "all" }
    ]
    const action = changeTodolistTitleAC(newTodolistTitle, todoListId2)

    const endState = todoListReducer(startState, action)


    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)

})

test('correct filter of todolist should  be changed', ()=>{
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newFilter: FilterValuesType = 'completed'

    const startState:Array<TodoListsType>  =[
        {id: todoListId1, title: "What to learn", filter: "all" },
        {id: todoListId2, title: "What to buy", filter: "all" }
    ]
    const action =changeTodolistFilterAC(newFilter, todoListId2 )

    const endState = todoListReducer(startState, action)


    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)

})