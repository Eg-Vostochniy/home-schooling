import { IResNotify } from './../../models/INotify';
import { Dispatch } from "redux"
import { ReturnActionsTypes } from "../index"
import { INotify } from "../../models/INotify"
import { AlertAC, alertActions } from "../alert/actions"
import { DELETE_NOTIFY, SET_NOTIFIES } from "./types"
import { notifyAPI } from '../../utils/services/notifyService';

export const notifyActions = {
    setNotifies: (payload: INotify[]) => {
        return {
            type: SET_NOTIFIES,
            payload
        }
    },
    deleteNotify: (payload: string) => {
        return {
            type: DELETE_NOTIFY,
            payload
        }
    }
}

export type NotifyAC = ReturnActionsTypes<typeof notifyActions>

export const notifyThunks = {
    getNotifies: (token: string) => async (dispatch: Dispatch<AlertAC | NotifyAC>) => {
        try {
            const res = await notifyAPI.getNotifies(token)
            dispatch(notifyActions.setNotifies(res.data))
        } catch (error: any) {
            dispatch(alertActions.alert({ error: error.response.data.msg }))
        }
    },
    createNotify: (msg: IResNotify, token: string) => async (dispatch: Dispatch<AlertAC | NotifyAC>) => {
        try {
            await notifyAPI.createNotify(msg, token)
        } catch (error: any) {
            dispatch(alertActions.alert({ error: error.response.data.msg }))
        }
    },
    deleteNotify: (id: string, token: string) => async (dispatch: Dispatch<NotifyAC | AlertAC>) => {
        try {
            await notifyAPI.deleteNotify(id, token)
            dispatch(notifyActions.deleteNotify(id))
        } catch (error: any) {
            dispatch(alertActions.alert({ error: error.response.data.msg }))
        }
    }
}

