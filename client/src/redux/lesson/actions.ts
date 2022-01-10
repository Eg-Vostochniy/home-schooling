import { IReqLesson } from './../../models/ILesson';
import { Dispatch } from 'redux';
import { ILesson } from '../../models/ILesson';
import { lessonAPI } from '../../utils/services/lessonService';
import { AlertAC, alertActions } from '../alert/actions';
import { ReturnActionsTypes } from './../index';
import { GET_LESSONS, ADD_NEW_LESSON, DELETE_LESSON, UPDATE_LESSON } from './types';
export const lessonActions = {
    setLessons: (payload: ILesson[]) => { return { type: GET_LESSONS, payload } as const },
    addNewLesson: (payload: ILesson) => { return { type: ADD_NEW_LESSON, payload } as const },
    deleteLesson: (payload: string) => { return { type: DELETE_LESSON, payload } as const },
    updateLesson: (payload: ILesson) => { return { type: UPDATE_LESSON, payload } as const },
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
    createLesson: (data: IReqLesson, token: string) => async (dispatch: Dispatch<AlertAC | LessonAC>) => {
        try {
            const res = await lessonAPI.createLesson(data, token)
            dispatch(lessonActions.addNewLesson(res.data.addedLesson))

            dispatch(alertActions.alert({ success: res.data.msg }))
        } catch (err: any) {
            dispatch(alertActions.alert({ error: err.response.data.msg }))
        }
    },
    deleteLesson: (id: string, token: string) => async (dispatch: Dispatch<AlertAC | LessonAC>) => {
        try {
            const res = await lessonAPI.deleteLesson(id, token)
            dispatch(lessonActions.deleteLesson(id))
            dispatch(alertActions.alert({ success: res.data.msg }))
        } catch (err: any) {
            dispatch(alertActions.alert({ error: err.response.data.msg }))
        }
    },
    updateLessonStatus: (
        id: string,
        status: string,
        token: string) => async (dispatch: Dispatch<AlertAC | LessonAC>) => {
            try {
                const res = await lessonAPI.updateLessonStatus(id, status, token)
                dispatch(lessonActions.updateLesson(res.data.lesson))

                dispatch(alertActions.alert({ success: res.data.msg }))
            } catch (err: any) {
                dispatch(alertActions.alert({ error: err.response.data.msg }))
            }
        }
}