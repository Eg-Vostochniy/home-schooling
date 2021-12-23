import { INotify } from "../../models/INotify";
import { NotifyAC } from "./actions";
import { DELETE_NOTIFY, SET_NOTIFIES } from "./types";

const initialState = {
    notifies: [] as INotify[]
}

type State = typeof initialState

export const notifyReducer = (state = initialState, action: NotifyAC): State => {
    switch (action.type) {
        case SET_NOTIFIES: return {
            ...state,
            notifies: action.payload as INotify[]
        }
        case DELETE_NOTIFY: return {
            ...state,
            notifies: state.notifies.filter(notify => notify._id !== action.payload)
        }

        default: return state
    }
}