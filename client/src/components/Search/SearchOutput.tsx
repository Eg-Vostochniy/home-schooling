import { useRef } from "react"
import { useClickOutside } from "../../hooks/useClickOutside"
import { SearchedUser, SearchedUsers } from "../../models/IUser"
import { Avatar } from "../Avatar"

type Props = {
    onClose: () => void
    searched_users: SearchedUsers
    setChoosedUser: (user: SearchedUser) => void
}

export const SearchOutput: React.FC<Props> = ({ onClose, searched_users, setChoosedUser }) => {

    const refDiv = useRef<HTMLDivElement>(null)

    useClickOutside(refDiv, onClose)

    return (
        <>
            {
                searched_users.length === 0 ?
                    <div className='search_output-error' ref={refDiv}>Пользователь не найден</div> :
                    <div className='search_output' ref={refDiv}>
                        {searched_users.map(user => (
                            <div
                                key={user._id}
                                className='search_output-user'
                                onClick={() => setChoosedUser(user)}
                            >
                                <Avatar url={user.avatar} size='small' />
                                <div className='search_output-names'>
                                    <span>{user.username}</span>
                                    <span>{user.fullname}</span>
                                </div>
                            </div>
                        ))}
                    </div>
            }
        </>
    )
}