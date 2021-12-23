import { useState } from "react"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { useAppSelector } from "../../../hooks/useAppSelector"
import { useSearch } from "../../../hooks/useSearch"
import { IResUser } from "../../../models/IUser"
import { Search } from "../../Search/Search"

type Props = {
    addedSearchedUsers: IResUser[]
}

export const SearchStudents: React.FC<Props> = ({ addedSearchedUsers }) => {
    const [searchValue, setSearchValue] = useState('')

    const { getUsers } = useAppDispatch()

    const { isSearched, isLoad, handleSearch } = useSearch({
        search: getUsers,
        searchValue
    })

    const { users } = useAppSelector(state => state.userReducer)
    const { setSearchedUsers } = useAppDispatch()

    return (
        <div className='search'>
            <Search
                inputContent='Введите имя'
                labelName='Имя'
                isSearched={isSearched}
                handleSearch={handleSearch}
                isLoad={isLoad}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                searched_users={users}
                addedSearchedUsers={addedSearchedUsers}
                setSearchedUsers={setSearchedUsers}
            />
        </div>
    )
}