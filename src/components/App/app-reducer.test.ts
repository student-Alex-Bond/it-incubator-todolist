import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";


let startState: InitialStateType

beforeEach(() => {


    startState = {status: "idle", error: null, isInitialized: false}

})

test('correct error message should be set', () => {


    const endState = appReducer(startState, setAppErrorAC({error: 'some error'}))

    expect(endState.error).toBe('some error')
    expect(endState.status).toBe("idle")
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC({status: 'loading'}))

    expect(endState.error).toBe(null)
    expect(endState.status).toBe("loading")
})

