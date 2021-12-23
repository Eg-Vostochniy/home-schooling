import { useState } from "react"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { useAppSelector } from "../../../hooks/useAppSelector"
import { IResUser } from "../../../models/IUser"
import { Search } from "../../Search/Search"
import { InputChange } from '../../../App'

type Props = {
    addedSearchedUsers: IResUser[]
    setGroupName: (name: string) => void
    groupName: string
}

export const SearchAddedStudent: React.FC<Props> = ({ addedSearchedUsers, setGroupName, groupName }) => {
    const [searchValue, setSearchValue] = useState('')
    const [isSearched, setIsSearched] = useState(false)
    const [isLoad, setIsLoad] = useState(false)
    const [searched_users, setSearchedUsers] = useState<IResUser[]>([])


    const { roleUsers } = useAppSelector(state => state.authReducer.user)
    const { setSearchedGroupUsers } = useAppDispatch()

    const handleSearch = async () => {
        if (searchValue.length > 0 && !isLoad) {
            setIsLoad(true)
            const arr = roleUsers.filter(roleUser => {
                if (!roleUser.username.search(searchValue)) return roleUser
                return null
            })
            setSearchedUsers(arr)
            setIsSearched(true)
            setIsLoad(false)
        }
    }
    const handleSetGroupName = (e: InputChange) => {
        setGroupName(e.target.value)
    }

    return (
        <>
            <div className='search'>
                <label>
                    <span>Имя группы</span>
                    <input
                        type='text'
                        placeholder="Введите название"
                        onChange={handleSetGroupName}
                        value={groupName}
                    />
                </label>
                <Search
                    inputContent='Имя пользователя'
                    labelName='Имя'
                    isSearched={isSearched}
                    handleSearch={handleSearch}
                    isLoad={isLoad}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    searched_users={searched_users}
                    addedSearchedUsers={addedSearchedUsers}
                    setSearchedUsers={setSearchedGroupUsers}
                />
            </div>
        </>
    )
}