import { academicPerformanceReducer } from './academicPerformance/reducer';
import { lessonReducer } from './lesson/reducer';
import { notifyReducer } from './notify/reducer';
import { userReducer } from './user/reducer'
import { alertReducer } from './alert/reducer'
import { authReducer } from './auth/reducer'
import { Action, applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkAction } from "redux-thunk"

const rootReducer = combineReducers({
    authReducer,
    alertReducer,
    userReducer,
    notifyReducer,
    lessonReducer,
    academicPerformanceReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export type ReturnActionsTypes<T> = T extends { [key: string]: (...args: any) => infer U } ? U : never
export type ReturnThunksTypes<A extends Action, R = Promise<void>> = ThunkAction<R, AppState, unknown, A>
