import { ILesson } from "../../models/ILesson"
import { LessonAC } from "./actions"
import { GET_LESSONS, ADD_NEW_LESSON, DELETE_LESSON, UPDATE_LESSON } from "./types"

const initialState = {
    lessons: [] as ILesson[]
}

type State = typeof initialState

export const lessonReducer = (state = initialState, action: LessonAC): State => {
    switch (action.type) {
        case GET_LESSONS: return {
            ...state,
            lessons: action.payload
        }
        case ADD_NEW_LESSON: return {
            ...state,
            lessons: [...state.lessons, action.payload]
        }
        case DELETE_LESSON: return {
            ...state,
            lessons: state.lessons.filter(l => l._id !== action.payload)
        }
        case UPDATE_LESSON: return {
            ...state,
            lessons: state.lessons.map(l => (
                l._id === action.payload._id ? action.payload : l
            ))
        }
        default: return state
    }
}