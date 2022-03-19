import {Dispatch} from "redux";
import {SetAppErrorType, setAppStatusAC, SetAppStatusType} from "../../components/App/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todoLists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: InitialStateType = {}

export const loginReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {

        default:
            return state
    }

}
//actions


//thunks

export const loginTC = (data: LoginParamsType) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data).then((res) => {
        if (res.data.resultCode === 0) {
            alert('UUUUURRRRRRAAAAAAA')
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}


//types
type ActionType = any
type InitialStateType ={}
type ThunkDispatch = Dispatch<ActionType | SetAppStatusType | SetAppErrorType>

