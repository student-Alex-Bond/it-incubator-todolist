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

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>('')


    const getTasks = () => {
        todoListsApi.getTasks(todolistID).then((res) => {
            setState(res.data)
        })
    }


    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'} value={todolistID}
                   onChange={(e)=>setTodolistID(e.currentTarget.value)}/>
            <input placeholder={'taskTitle'} value={todolistID}
                   onChange={(e)=>setTodolistID(e.currentTarget.value)}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskID, setTaskID] = useState<string>('')
    const [todolistID, setTodolistID] = useState<string>('')

    const deleteTask = () => {
        const todolistsId = 'd9c1ad55-5ba8-4e68-b523-bc18dce190ed'
        const taskID = ''

        todoListsApi.deleteTask(todolistsId, taskID).then((res) => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'} value={todolistID} onChange={(e)=>setTodolistID(e.currentTarget.value)}/>
            <input placeholder={'taskID'} value={taskID} onChange={(e)=>setTaskID(e.currentTarget.value)}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistID, setTodolistID] = useState<string>('')

    const createTask = () => {
        todoListsApi.createTask(todolistID, taskTitle).then((res) => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'} value={todolistID} onChange={(e)=>setTodolistID(e.currentTarget.value)}/>
            <input placeholder={'taskTitle'} value={taskTitle} onChange={(e)=>setTaskTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [taskID, setTaskID] = useState<string>('')
    const [todolistID, setTodolistID] = useState<string>('title 1')
    const [taskDescription, setTaskDescription] = useState<string>('Description')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const updateTask = () => {
        todoListsApi.updateTask(todolistID, taskID, {
            deadline: deadline,
            priority: priority,
            status: status,
            startDate: startDate,
            title: taskTitle,
            description: taskDescription

        } ).then((res) => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'} value={todolistID} onChange={(e)=>setTodolistID(e.currentTarget.value)}/>
            <input placeholder={'taskTitle'} value={taskTitle} onChange={(e)=>setTaskTitle(e.currentTarget.value)}/>
            <input placeholder={'taskDescription'} value={taskDescription} onChange={(e)=>setTaskDescription(e.currentTarget.value)}/>
            <input placeholder={'status'} value={status} onChange={(e)=>setStatus(+e.currentTarget.value)}/>
            <input placeholder={'priority'} value={priority} onChange={(e)=>setPriority(+e.currentTarget.value)}/>
            <input placeholder={'startDate'} value={startDate} onChange={(e)=>setStartDate(e.currentTarget.value)}/>
            <input placeholder={'deadline'} value={deadline} onChange={(e)=>setDeadline(e.currentTarget.value)}/>
            <input placeholder={'taskID'} value={taskID} onChange={(e)=>setTaskID(e.currentTarget.value)}/>

            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}