import { SearchedUsers } from './../../models/IUser'
import { IStudent } from "../../models/IUser"
import { UserAC } from "./actions"
import { DELETE_SEARCHED_USER, GET_STUDENTS, SET_SEARCHED_USERS } from './types'

const initialState = {
    students: [] as IStudent[],
    searchedUsers: [] as SearchedUsers
}

type ReturnState = typeof initialState

export const userReducer = (state = initialState, action: UserAC): ReturnState => {
    switch (action.type) {
        case GET_STUDENTS: return { ...state, students: action.payload }
        case SET_SEARCHED_USERS: return {
            ...state,
            searchedUsers: [...state.searchedUsers, action.payload]
        }
        case DELETE_SEARCHED_USER: return {
            ...state,
            searchedUsers: state.searchedUsers.filter(user => user._id !== action.payload)
        }

        default: return state
    }
}