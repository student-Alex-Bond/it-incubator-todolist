import {setAppErrorAC, SetAppErrorType, setAppStatusAC, SetAppStatusType} from "../components/App/app-reducer";
import {ResponseType} from "../api/todoLists-api";
import { Dispatch } from "redux";





export const handleServerNetworkError = (error: {message: string }, dispatch: Dispatch<SetAppErrorType| SetAppStatusType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorType| SetAppStatusType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}
