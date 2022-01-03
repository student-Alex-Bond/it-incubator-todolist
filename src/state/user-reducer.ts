export type StateType={
    age: number
    childrenCount: number
    name: string
}

export type ActionType ={
    type: string
    [key: string]: any
}


export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch(action.type) {
        case 'INCREMENT-AGE':
            return { //деструктуризация обьекта плюс изменение одного из полей обьекта при этом   возвращается новый обьект и не нарушается правило чистых функции (reducer - это чистая функция)
                ...state,
                age: state.age + 1
            }
        case 'INCREMENT-CHILDREN-COUNT':
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
        case 'CHANGE-NAME':
            return{
                ...state,
                name: action.newName
            }
        default:
            throw new Error("I don't understand this action type")
    }
}