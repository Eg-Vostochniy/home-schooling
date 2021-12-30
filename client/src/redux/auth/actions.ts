import { IAuth, IRegistData } from './../../models/IAuth'
import { ReturnActionsTypes } from './../index'
import { Dispatch } from 'redux'
import { ILoginData } from '../../models/IAuth'
import { AUTH } from "./types"
import { AlertAC, alertActions } from '../alert/actions'
import { authAPI } from '../../utils/services/authService'
import { UserAC, userActions } from '../user/actions'
import { IUser } from '../../models/IUser'
import { LessonAC, lessonActions } from '../lesson/actions'

export const authActions = {
    auth: (payload: IAuth) => { return { type: AUTH, payload } as const }
}
export type AuthAC = ReturnActionsTypes<typeof authActions>

export const authThunks = {
    login: (data: ILoginData) => async (dispatch: Dispatch<AuthAC | AlertAC>) => {
        try {
            dispatch(alertActions.alert({ loading: true }))

            const res = await authAPI.login(data)
            dispatch(authActions.auth(res.data))

            localStorage.setItem('token', res.data.token)

            dispatch(alertActions.alert({ success: res.data.msg }))
        } catch (error: any) {
            dispatch(alertActions.alert({ error: error.response.data.msg }))
        }
    },
    register: (data: IRegistData) => async (dispatch: Dispatch<AuthAC | AlertAC>) => {
        try {
            dispatch(alertActions.alert({ loading: true }))

            const res = await authAPI.register(data)
            dispatch(authActions.auth(res.data))

            localStorage.setItem('token', res.data.token)

            dispatch(alertActions.alert({ success: res.data.msg }))
        } catch (error: any) {
            dispatch(alertActions.alert({ error: error.response.data.msg }))
        }
    },
    logout: () => async (dispatch: Dispatch<AuthAC | AlertAC | UserAC | LessonAC>) => {
        try {
            dispatch(alertActions.alert({ loading: true }))

            const res = await authAPI.logout()
            dispatch(authActions.auth({} as IAuth))
            dispatch(lessonActions.setLessons([]))

            localStorage.removeItem('token')
            dispatch(userActions.nullifySearchedUsers())

            dispatch(alertActions.alert({ success: res.data.msg }))
        } catch (error: any) {
            dispatch(alertActions.alert({ error: error.response.data.msg }))
        }
    },
    refreshToken: () => async (dispatch: Dispatch<AuthAC | AlertAC>) => {
        try {
            dispatch(alertActions.alert({ loading: true }))

            const res = await authAPI.refresh_token()
            dispatch(authActions.auth(res.data))

            dispatch(alertActions.alert({ success: res.data.msg }))
        } catch (error: any) {
            dispatch(alertActions.alert({ error: error.response.data.msg }))
        }
    },
    updateAuthedUser: (data: IUser, token: string) => async (dispatch: Dispatch<AuthAC | AlertAC>) => {
        try {
            const res = await authAPI.updateAuthedUser({
                username: data.username,
                fullname: data.fullname,
                avatar: data.avatar
            }, token)
            dispatch(authActions.auth({
                token, user: data, msg: res.data.msg
            }))

            dispatch(alertActions.alert({ success: res.data.msg }))
        } catch (error: any) {
            dispatch(alertActions.alert({ error: error.response.data.msg }))
        }
    }
}