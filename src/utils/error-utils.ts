import {setAppErrorAC, setAppStatusAC} from "../components/App/app-reducer";
import {ResponseType} from "../api/todoLists-api";
import { Dispatch } from "redux";





export const handleServerNetworkError = (error: {message: string }, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({error: error.message ?  error.message :  'Some error occurred'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error:'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}
