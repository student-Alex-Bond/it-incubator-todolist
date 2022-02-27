import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "cc358979-2326-44e9-b2a5-87c1d429fcbc"
    }

}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}


type ResponseType<D={}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTaskResponse = {
    error: string
    totalCount: number
    items: TaskType[]
}


export type UpdateTaskType ={
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todoListsApi = {
    getTodoList() {
        return instance.get<Array<TodolistType>>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
    },
    deleteTodolist(todoListID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListID}`)
    },
    updateTodolist(todolistID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistID}`, {title: title})
    },
    getTasks(todolistID: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todolistID}/tasks`)
    },
    deleteTask(todolistID: string, taskID: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
    }
}