import React, {useEffect, useState} from 'react'
import {todoListsApi} from "../api/todoLists-api";

export default {
    title: 'My Stories/API'
}


export const getTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi.getTodoList().then((res
        ) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const createTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi.createTodolist('I am a Dancer Disco').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const deleteTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi.deleteTodolist('d9c1ad55-5ba8-4e68-b523-bc18dce190ed').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const updateTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi.updateTodolist('d9c1ad55-5ba8-4e68-b523-bc18dce190ed', 'JAck vorobei').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}