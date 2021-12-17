import { useState } from "react"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { useAppSelector } from "../../../hooks/useAppSelector"
import { useSearch } from "../../../hooks/useSearch"
import { SearchedUsers } from "../../../models/IUser"
import { Search } from "../../Search/Search"

export const SearchAddedStudent: React.FC<{ addedSearchedUsers: SearchedUsers }> = ({ addedSearchedUsers }) => {
    const [searchValue, setSearchValue] = useState('')

    const { getStudents } = useAppDispatch()

    const { isSearched, isLoad, handleSearch } = useSearch({
        getUsers: getStudents,
        searchValue
    })

    const students = useAppSelector(state => state.userReducer.students)
    return (
        <>
            <div className='search'>
                <Search
                    inputContent='Введите имя вашего ученика'
                    labelName='Имя вашего ученика'
                    isSearched={isSearched}
                    handleSearch={handleSearch}
                    isLoad={isLoad}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    searched_users={students}
                    addedSearchedUsers={addedSearchedUsers}
                />
            </div>
        </>
    )
}