import { academicPerformanceAPI } from './../../utils/services/academicePerformanceService';
import { IResAcademicPerformance } from './../../models/IAcademicPerformance';
import { Dispatch } from 'redux'
import { ReturnActionsTypes } from "../index"
import { IAcademicPerformance } from "../../models/IAcademicPerformance"
import { ACTIVATE_MODAL, ADD_RESULTS_PER_LESSON, GET_ACADEMIC_PERFORMANCE, SET_CURRENT_STUDENT_PERFORMANCE, SET_LESSON_STUDENTS } from "./types"
import { AlertAC, alertActions } from '../alert/actions'

export const academicPerformanceActions = {
    setPerformances: (payload: IAcademicPerformance[]) => {
        return { type: GET_ACADEMIC_PERFORMANCE, payload } as const
    },
    addLessonResults: (payload: IAcademicPerformance) => {
        return { type: ADD_RESULTS_PER_LESSON, payload } as const
    },
    isAddingResultsModal: (payload: boolean) => {
        return { type: ACTIVATE_MODAL, payload } as const
    },
    setLessonStudents: (payload: string[]) => {
        return { type: SET_LESSON_STUDENTS, payload } as const
    },
    setCurrentStudentPerformance: (payload: string) => {
        return { type: SET_CURRENT_STUDENT_PERFORMANCE, payload } as const
    }
}

export type AcademicPerformanceAC = ReturnActionsTypes<typeof academicPerformanceActions>

export const academicPerformanceThunks = {
    getPerformances: (token: string) =>
        async (dispatch: Dispatch<AlertAC | AcademicPerformanceAC>) => {
            try {
                const res = await academicPerformanceAPI.getPerformances(token)
                dispatch(academicPerformanceActions.setPerformances(res.data))
            } catch (error: any) {
                dispatch(alertActions.alert({ error: error.response.data.msg }))
            }
        },
    addLessonResults: (lessonResults: IResAcademicPerformance, token: string) =>
        async (dispatch: Dispatch<AlertAC | AcademicPerformanceAC>) => {
            try {
                const res = await academicPerformanceAPI.addLessonResults(lessonResults, token)
                dispatch(academicPerformanceActions.addLessonResults(res.data.performance))

                dispatch(alertActions.alert({ success: res.data.msg }))
            } catch (error: any) {
                dispatch(alertActions.alert({ error: error.response.data.msg }))
            }
        }
}