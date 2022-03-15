import {appReducer, InitialStateType, setErrorAC, setStatusAC} from "./app-reducer";


let startState: InitialStateType

beforeEach(() => {


    startState = {status: "idle", error: null}

})

test('correct error message should be set', () => {


    const endState = appReducer(startState, setErrorAC('some error'))

    expect(endState.error).toBe('some error')
    expect(endState.status).toBe("idle")
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setStatusAC('loading'))

    expect(endState.error).toBe(null)
    expect(endState.status).toBe("loading")
})

