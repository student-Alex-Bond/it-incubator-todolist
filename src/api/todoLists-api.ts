import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "cc358979-2326-44e9-b2a5-87c1d429fcbc"
    }

}


export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}


type ReponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}


export const todoListsApi = {
    getTodoList() {
        return axios.get<Array<TodolistType>>("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)

    },
    createTodolist(title: string) {
        return axios.post<ReponseType<{item: TodolistType}>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)

    },
    deleteTodolist(todoListID: string) {
        return axios.delete<ReponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListID}`, settings)
    },
    updateTodolist(todolistID: string, title: string) {

        return axios.put<ReponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, {title: title}, settings)
    }
}