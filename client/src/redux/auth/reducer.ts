import { IAuth } from "../../models/IAuth"
import { AuthAC } from "./actions"
import { AUTH } from "./types"



export const authReducer = (state = {} as IAuth, action: AuthAC): IAuth => {
    switch (action.type) {
        case AUTH: return action.payload

        default: return state
    }
}