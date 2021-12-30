import { Portal } from "./Portal"
import loading from '../../img/Spinner-1s-200px.gif'
import { IResUser } from "../../models/IUser"
import { useClickOutside } from "../../hooks/useClickOutside"
import { useRef, useState } from "react"
import { Avatar } from "../Avatar"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"

type Props = {
    onClose: () => void
    searchedUsers: IResUser[]
    groupName: string
}

export const GroupPopup: React.FC<Props> = ({ children, onClose, searchedUsers, groupName }) => {
    const ref = useRef<HTMLDivElement>(null)
    useClickOutside(ref, onClose)

    const [err, setErr] = useState('')
    const [isLoad, setIsLoad] = useState(false)

    const { deleteSearchedUser, addNewGroup } = useAppDispatch()
    const { token, user, msg } = useAppSelector(state => state.authReducer)
    const { _id } = useAppSelector(state => state.authReducer.user)

    let groupUsers = searchedUsers.map(user => user._id)

    const setGroup = async () => {
        setIsLoad(true)
        await addNewGroup({
            groupUsers: [...groupUsers, _id], groupName
        }, { token, msg, user })
        setIsLoad(false)
    }

    return (
        <Portal>
            <div className='popup_block'>
                <div className='popup_container' ref={ref}>
                    <div className='popup_header'>
                        <span>Добавьте студента в новую группу</span>
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
                                    <Avatar url={user.avatar} size='small' />
                                    <div>{user.username}</div>
                                    <span onClick={() => deleteSearchedUser(user._id)}>
                                        &times;
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                    {err && <div>{err}</div>}
                    <button disabled={isLoad} onClick={setGroup}>{
                        !isLoad ?
                            'Добавить группу' :
                            <img src={loading} alt='load' />}</button>
                </div>
            </div>
        </Portal>
    )
}