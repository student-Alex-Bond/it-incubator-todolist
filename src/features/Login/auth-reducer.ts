import {Dispatch} from "redux";
import {setAppStatusAC} from "../../components/App/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todoLists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn : false
}

export const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{value: boolean}>){
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
/*(state: InitialStateType = initialState, action: ActionType): InitialStateType => {
//     switch (action.type) {
//         case "login/SET-IS-LOGGED-IN": {
//             return {...state, isLoggedIn: action.value}
//         }
//
//         default:
//             return state
//     }
//
// }
*/


//actions
//export const setIsLoggedIn = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const )

//thunks

export const {setIsLoggedIn} = slice.actions

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({value: true}))
            dispatch(setAppStatusAC({ status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout().then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({value: false}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}



//type ActionType = setIsLoggedInType
// type InitialStateType ={
//     isLoggedIn: boolean
// }


//export type setIsLoggedInType = ReturnType<typeof setIsLoggedIn>
//type ThunkDispatch = Dispatch<ActionType | SetAppStatusType | SetAppErrorType>

