import { TypedUseSelectorHook, useSelector } from "react-redux"
import { AppState } from "../redux"

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector