import { Dispatch } from "redux"
import { IResUser } from "../../models/IUser"
import { userAPI } from "../../utils/services/userService"
import { AlertAC, alertActions } from "../alert/actions"
import { ReturnActionsTypes } from "../index"
import {
    ADD_NEW_USER,
    DELETE_SEARCHED_GROUP_USER,
    DELETE_SEARCHED_USER,
    GET_USERS,
    NULLIFY_SEARCHED_GROUP_USERS,
    NULLIFY_SEARCHED_USERS,
    SET_SEARCHED_GROUP_USERS,
    SET_SEARCHED_USERS
} from "./types"


export const userActions = {
    setUsers: (payload: IResUser[]) => {
        return {
            type: GET_USERS,
            payload
        } as const
    },
    setSearchedUsers: (payload: IResUser) => {
        return {
            type: SET_SEARCHED_USERS,
            payload
        } as const
    },
    setSearchedGroupUsers: (payload: IResUser) => {
        return {
            type: SET_SEARCHED_GROUP_USERS,
            payload
        } as const
    },
    deleteSearchedUser: (payload: string) => {
        return {
            type: DELETE_SEARCHED_USER,
            payload
        } as const
    },
    deleteSearchedGroupUser: (payload: string) => {
        return {
            type: DELETE_SEARCHED_GROUP_USER,
            payload
        } as const
    },
    nullifySearchedUsers: () => {
        return {
            type: NULLIFY_SEARCHED_USERS
        } as const
    },
    nullifySearchedGroupUsers: () => {
        return {
            type: NULLIFY_SEARCHED_GROUP_USERS
        } as const
    },
    setNewUser: (payload: IResUser) => {
        return {
            type: ADD_NEW_USER,
            payload
        } as const
    }
}

export type UserAC = ReturnActionsTypes<typeof userActions>

export const userThunks = {
    getUsers: (username: string, token: string) => async (dispatch: Dispatch<UserAC | AlertAC>) => {
        try {
            const res = await userAPI.getUsers(username, token)
            dispatch(userActions.setUsers(res.data))
        } catch (err: any) {
            dispatch(alertActions.alert({ error: err.response.data.msg }))
        }
    },
    addNewUser: (id: string, token: string) => async (dispatch: Dispatch<AlertAC | UserAC>) => {
        try {
            const res = await userAPI.addNewUser(id, token)
            //dispatch(userActions.setNewUser(res.data.user))
            dispatch(alertActions.alert({ success: res.data.msg }))
        } catch (err: any) {
            dispatch(alertActions.alert({ error: err.response.data.msg }))
        }
    },
    deleteUser: (id: string, token: string) => async (dispatch: Dispatch<AlertAC>) => {
        try {
            const res = await userAPI.deleteUser(id, token)
            dispatch(alertActions.alert({ success: res.data.msg }))
        } catch (err: any) {
            dispatch(alertActions.alert({ error: err.response.data.msg }))
        }
    },
    addNewGroup: (data: any, token: string) => async (dispatch: Dispatch<AlertAC>) => {
        try {
            const res = await userAPI.addNewGroup(data, token)
        } catch (err: any) {
            dispatch(alertActions.alert({ error: err.response.data.msg }))
        }
    }
}    