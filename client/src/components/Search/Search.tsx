import { InputChange } from "../../App"
import { IResUser } from "../../models/IUser"
import search from '../../img/premium-icon-search-2414255.png'
import loading from '../../img/Spinner-1s-200px.gif'
import { SearchOutput } from "./SearchOutput"
import { useRef, useState } from "react"
import { useClickOutside } from "../../hooks/useClickOutside"

type Props = {
    labelName: string
    inputContent: string
    isLoad: boolean
    isSearched: boolean
    setSearchValue: (value: string) => void
    searchValue: string
    handleSearch: () => void
    searched_users: IResUser[]
    addedSearchedUsers: IResUser[]
    setSearchedUsers: (user: IResUser) => void
}

export const Search: React.FC<Props> = ({
    labelName,
    inputContent,
    isLoad,
    setSearchValue,
    searchValue,
    handleSearch,
    isSearched,
    searched_users,
    addedSearchedUsers,
    setSearchedUsers
}) => {
    const [isClosed, setIsClosed] = useState(true)
    const [err, setErr] = useState('')
    const [isErrClosed, setIsErrClosed] = useState(true)

    const refDiv = useRef<HTMLDivElement>(null)

    const handleCloseErr = () => {
        setIsErrClosed(false)
    }
    useClickOutside(refDiv, handleCloseErr)

    const handleInput = (e: InputChange) => {
        if (!isLoad) {
            setSearchValue(e.target.value)
        }
    }
    const handleChooseUser = (choosedUser: IResUser) => {
        err && setIsErrClosed(true)
        setErr('')
        if (!addedSearchedUsers.find(user => user._id === choosedUser._id))
            setSearchedUsers(choosedUser)
        else setErr('Пользователь уже добавлен')
        setIsClosed(true)
    }
    const onCloseModal = () => {
        setIsClosed(true)
    }
    const onOpenModal = () => {
        isClosed && setIsClosed(false)
    }
    const handleOnSearch = () => {
        err && setIsErrClosed(true)
        handleSearch()
        setIsClosed(false)
        setErr('')
    }

    return (
        <div className='search'>
            <span>{labelName}</span>
            {
                <input
                    placeholder={inputContent}
                    value={searchValue}
                    onChange={handleInput}
                    onClick={onOpenModal}
                />
            }
            <img
                onClick={handleOnSearch}
                src={isLoad ? loading : search}
                alt='search'
                className='search_img'
            />
            {
                err && isErrClosed &&
                <div
                    ref={refDiv}
                    onClick={handleCloseErr}
                    className='search_output-error'
                >{err}
                </div>
            }
            {
                isSearched && !isClosed && <SearchOutput
                    searched_users={searched_users}
                    setChoosedUser={handleChooseUser}
                    onClose={onCloseModal}
                />
            }
        </div>
    )
}