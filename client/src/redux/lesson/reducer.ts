import { ILesson } from "../../models/ILesson"
import { LessonAC } from "./actions"
import { ADD_LESSON, GET_LESSONS } from "./types"

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
        case ADD_LESSON: return {
            ...state,
            lessons: [...state.lessons, action.payload]
        }
        default: return state
    }
}