import { useRef } from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useClickOutside } from "../../hooks/useClickOutside"
import { SearchedUsers } from "../../models/IUser"
import { Portal } from "./Portal"

type Props = {
    onClose: () => void
    popupName: string
    popupButton: string
    searchedUsers: SearchedUsers
}

export const Popup: React.FC<Props> = ({ children, onClose, popupName, popupButton, searchedUsers }) => {
    const ref = useRef<HTMLDivElement>(null)
    const { deleteSearchedUser } = useAppDispatch()

    useClickOutside(ref, onClose)

    const setUsers = () => {
        console.log(searchedUsers)
    }

    return (
        <Portal>
            <div className='popup_block'>
                <div className='popup_container' ref={ref}>
                    <div className='popup_header'>
                        <span>{popupName}</span>
                        <span
                            className='popup_close'
                            onClick={onClose}
                        >&times;</span>
                    </div>
                    <div className='popup_content'>{children}</div>
                    <div className='added_searched-users'>
                        {
                            searchedUsers.map(user => (
                                <div key={user._id} className='added_searched-user'>
                                    <img src={user.avatar} alt='user' />
                                    <div>{user.username}</div>
                                    <span onClick={() => deleteSearchedUser(user._id)}>
                                        &times;
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                    <button onClick={setUsers}>{popupButton}</button>
                </div>
            </div>
        </Portal>
    )
}