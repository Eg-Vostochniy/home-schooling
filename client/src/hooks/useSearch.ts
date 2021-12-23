import { useState } from "react"
import { useAppSelector } from "./useAppSelector"

type Props = {
    search: (username: string, token: string) => void
    searchValue: string
}

export const useSearch = ({ search, searchValue }: Props) => {
    const [isSearched, setIsSearched] = useState(false)
    const [isLoad, setIsLoad] = useState(false)

    const { token } = useAppSelector(state => state.authReducer)

    const handleSearch = async () => {
        if (searchValue.length > 0 && !isLoad) {
            setIsLoad(true)
            await search(searchValue, token)
            setIsSearched(true)
            setIsLoad(false)
        }
    }
    return { isSearched, isLoad, handleSearch }
}