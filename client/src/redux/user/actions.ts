import { Dispatch } from "redux"
import { IAuth } from "../../models/IAuth"
import { IGroup, IResGroup, IResUser } from "../../models/IUser"
import { userAPI } from "../../utils/services/userService"
import { AlertAC, alertActions } from "../alert/actions"
import { AuthAC, authActions } from "../auth/actions"
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
    addNewUser: (user: IResUser, auth: IAuth) => async (dispatch: Dispatch<AlertAC | AuthAC>) => {
        try {
            const res = await userAPI.addNewUser(user._id, auth.token)
            dispatch(alertActions.alert({ success: res.data.msg }))

            dispatch(authActions.auth({
                ...auth, user: {
                    ...auth.user,
                    roleUsers: [...auth.user.roleUsers, user]
                }
            }))
        } catch (err: any) {
            dispatch(alertActions.alert({ error: err.response.data.msg }))
        }
    },
    deleteUser: (id: string, auth: IAuth) => async (dispatch: Dispatch<AlertAC | AuthAC>) => {
        try {
            const res = await userAPI.deleteUser(id, auth.token)
            dispatch(alertActions.alert({ success: res.data.msg }))

            dispatch(authActions.auth({
                ...auth,
                user: {
                    ...auth.user,
                    roleUsers: auth.user.roleUsers.filter(rU => rU._id !== id)
                }
            }))
        } catch (err: any) {
            dispatch(alertActions.alert({ error: err.response.data.msg }))
        }
    },
    addNewGroup: (group: IGroup, auth: IAuth) => async (dispatch: Dispatch<AlertAC | AuthAC>) => {
        try {
            const res = await userAPI.addNewGroup(group, auth.token)
            dispatch(alertActions.alert({ success: res.data.msg }))

            dispatch(authActions.auth({
                ...auth,
                user: {
                    ...auth.user,
                    groupAddedUsers: [...auth.user.groupAddedUsers, group as IResGroup]
                }
            }))
        } catch (err: any) {
            dispatch(alertActions.alert({ error: err.response.data.msg }))
        }
    }
}    