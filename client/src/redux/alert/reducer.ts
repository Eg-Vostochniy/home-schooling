import { IAlert } from './../../models/IAlert'
import { AlertAC } from "./actions"
import { ALERT } from './types'

export const alertReducer = (state: IAlert = {}, action: AlertAC): IAlert => {
    switch (action.type) {
        case ALERT: return action.payload

        default: return state
    }
}