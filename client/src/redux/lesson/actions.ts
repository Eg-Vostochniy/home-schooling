import { IReqLesson } from './../../models/ILesson';
import { Dispatch } from 'redux';
import { ILesson } from '../../models/ILesson';
import { lessonAPI } from '../../utils/services/lessonService';
import { AlertAC, alertActions } from '../alert/actions';
import { ReturnActionsTypes } from './../index';
import { ADD_LESSON, GET_LESSONS } from './types';
export const lessonActions = {
    setLessons: (payload: ILesson[]) => { return { type: GET_LESSONS, payload } as const },
    addLesson: (payload: ILesson) => { return { type: ADD_LESSON, payload } as const }
}

export type LessonAC = ReturnActionsTypes<typeof lessonActions>

export const lessonThunks = {
    getLessons: (token: string) => async (dispatch: Dispatch<AlertAC | LessonAC>) => {
        try {
            const res = await lessonAPI.getLessons(token)
            dispatch(lessonActions.setLessons(res.data))
        } catch (err: any) {
            dispatch(alertActions.alert({ error: err.response.data.msg }))
        }
    },
    createLesson: (data: ILesson, token: string) => async (dispatch: Dispatch<AlertAC | LessonAC>) => {
        try {
            const res = await lessonAPI.createLesson(data, token)
            dispatch(alertActions.alert({ success: res.data.msg }))
            dispatch(lessonActions.addLesson(data))
        } catch (err: any) {
            dispatch(alertActions.alert({ error: err.response.data.msg }))
        }
    },
    deleteLesson: (id: string, token: string) => async (dispatch: Dispatch<AlertAC>) => {
        try {
            const res = await lessonAPI.deleteLesson(id, token)
            dispatch(alertActions.alert({ success: res.data.msg }))
        } catch (err: any) {
            dispatch(alertActions.alert({ error: err.response.data.msg }))
        }
    },
    updateLessonStatus: (id: string, status: string, token: string) => async (dispatch: Dispatch<AlertAC>) => {
        try {
            const res = await lessonAPI.updateLessonStatus(id, status, token)
            dispatch(alertActions.alert({ success: res.data.msg }))
        } catch (err: any) {
            dispatch(alertActions.alert({ error: err.response.data.msg }))
        }
    }
}