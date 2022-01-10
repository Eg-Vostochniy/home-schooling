import { IAcademicPerformance } from "../../models/IAcademicPerformance"
import { AcademicPerformanceAC } from "./actions"
import { ADD_RESULTS_PER_LESSON, GET_ACADEMIC_PERFORMANCE, ACTIVATE_MODAL, SET_LESSON_STUDENTS, SET_CURRENT_STUDENT_PERFORMANCE } from "./types"

const initialState = {
    performances: [] as IAcademicPerformance[],
    isOpen: false,
    lessonStudents: [] as string[],
    currentStudentPerformance: ''
}

type InitialState = typeof initialState

export const academicPerformanceReducer = (
    state = initialState, action: AcademicPerformanceAC
): InitialState => {
    switch (action.type) {
        case GET_ACADEMIC_PERFORMANCE: return {
            ...state,
            performances: action.payload
        }
        case ADD_RESULTS_PER_LESSON: return {
            ...state,
            performances: [...state.performances, action.payload]
        }
        case ACTIVATE_MODAL: return {
            ...state,
            isOpen: action.payload
        }
        case SET_LESSON_STUDENTS: return {
            ...state,
            lessonStudents: action.payload
        }
        case SET_CURRENT_STUDENT_PERFORMANCE: return {
            ...state,
            currentStudentPerformance: action.payload
        }

        default: return state
    }
}