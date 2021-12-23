import { IResUser } from "../../models/IUser"
import { UserAC } from "./actions"
import {
    DELETE_SEARCHED_GROUP_USER,
    DELETE_SEARCHED_USER,
    GET_USERS,
    NULLIFY_SEARCHED_GROUP_USERS,
    NULLIFY_SEARCHED_USERS,
    SET_SEARCHED_GROUP_USERS,
    SET_SEARCHED_USERS
} from "./types"

const initialState = {
    users: [] as IResUser[],
    searchedUsers: [] as IResUser[],
    searchedGroupUsers: [] as IResUser[]
}

type ReturnState = typeof initialState

export const userReducer = (state = initialState, action: UserAC): ReturnState => {
    switch (action.type) {
        case GET_USERS: return { ...state, users: action.payload }
        case SET_SEARCHED_USERS: return {
            ...state,
            searchedUsers: [...state.searchedUsers, action.payload]
        }
        case SET_SEARCHED_GROUP_USERS: return {
            ...state,
            searchedGroupUsers: [...state.searchedGroupUsers, action.payload]
        }
        case DELETE_SEARCHED_USER: return {
            ...state,
            searchedUsers: state.searchedUsers.filter(user => (
                user._id !== action.payload))
        }
        case DELETE_SEARCHED_GROUP_USER: return {
            ...state,
            searchedGroupUsers: state.searchedGroupUsers.filter(user => (
                user._id !== action.payload))
        }
        case NULLIFY_SEARCHED_USERS: return {
            ...state,
            searchedUsers: []
        }
        case NULLIFY_SEARCHED_GROUP_USERS: return {
            ...state,
            searchedGroupUsers: []
        }

        default: return state
    }
}