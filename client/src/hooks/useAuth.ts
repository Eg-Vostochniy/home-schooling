import { useEffect } from "react"
import { useAppDispatch } from "./useAppDispatch"
import { useAppSelector } from "./useAppSelector"

export const useAuth = () => {
    const { token } = useAppSelector(state => state.authReducer)
    const { refreshToken } = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem('token'))
            refreshToken()
        //eslint-disable-next-line
    }, [])

    return token
}