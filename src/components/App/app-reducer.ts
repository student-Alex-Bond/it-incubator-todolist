import { Dispatch } from "redux"
import {authAPI} from "../../api/todoLists-api";
import {setIsLoggedIn} from "../../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: "idle",
    error:  null,
    isInitialized: false
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>){
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>){
            state.status = action.payload.status
        },
        setAppInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>){
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const {setAppErrorAC, setAppStatusAC, setAppInitializedAC} = slice.actions


export const appReducer = slice.reducer
//     (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case "APP/SET-IS-INITIALIZED":
//             return {...state, isInitialized: action.value}
//         default:
//             return {...state}
//     }
// }

// export const setAppErrorAC = (error: string | null) =>  ({type: 'APP/SET-ERROR', error} as const)
// export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
// export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)


export const initializeAppTC = () => (dispatch : Dispatch) => {
authAPI.me().then(res => {
    if(res.data.resultCode === 0){
        dispatch(setIsLoggedIn({value: true}))
    }
    dispatch(setAppInitializedAC({isInitialized: true}))
})
}

// type ActionType = SetAppErrorType | SetAppStatusType | SetInitializedType



export type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
}

// export type SetInitializedType = ReturnType<typeof setAppInitializedAC>
// export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
// export type SetAppStatusType = ReturnType<typeof setAppStatusAC>