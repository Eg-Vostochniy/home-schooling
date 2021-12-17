import { SearchedUser } from './../../models/IUser';
import { Dispatch } from "redux"
import { IStudent } from "../../models/IUser"
import { userAPI } from "../../utils/services/userService"
import { AlertAC, alertActions } from "../alert/actions"
import { ReturnActionsTypes } from "../index"
import { DELETE_SEARCHED_USER, GET_STUDENTS, SET_SEARCHED_USERS } from './types';

export const userActions = {
    setStudents: (payload: IStudent[]) => {
        return {
            type: GET_STUDENTS,
            payload
        } as const
    },
    setSearchedUsers: (payload: SearchedUser) => {
        return {
            type: SET_SEARCHED_USERS,
            payload
        } as const
    },
    deleteSearchedUser: (payload: string) => {
        return {
            type: DELETE_SEARCHED_USER,
            payload
        } as const
    }
}

export type UserAC = ReturnActionsTypes<typeof userActions>

export const userThunks = {
    getStudents: (username: string, token: string) => async (dispatch: Dispatch<UserAC | AlertAC>) => {
        try {
            const res = await userAPI.getStudents(username, token)
            dispatch(userActions.setStudents(res.data))
        } catch (err: any) {
            dispatch(alertActions.alert({ error: err.response.data.msg }))
        }
    }
}