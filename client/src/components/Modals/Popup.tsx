import { useRef, useState } from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useClickOutside } from "../../hooks/useClickOutside"
import { IResUser } from "../../models/IUser"
import { Avatar } from "../Avatar"
import { Portal } from "./Portal"
import loading from '../../img/Spinner-1s-200px.gif'

type Props = {
    onClose: () => void
    popupName: string
    popupButton: string
    searchedUsers: IResUser[]
}

export const Popup: React.FC<Props> = ({ children, onClose, popupName, popupButton, searchedUsers }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [err, setErr] = useState('')
    const [isLoad, setIsLoad] = useState(false)

    const { token, user } = useAppSelector(state => state.authReducer)
    const { notifies } = useAppSelector(state => state.notifyReducer)

    const { deleteSearchedUser, nullifySearchedUsers, createNotify } = useAppDispatch()

    useClickOutside(ref, onClose)

    const setUsers = async () => {
        if (searchedUsers.length === 0) setErr('Вы не добавили пользователя')
        else {
            if (user.roleUsers.length === 0 ||
                !user.roleUsers.find(user => searchedUsers.find(sUsr => (
                    sUsr._id === user._id
                )))
            ) {
                if (!notifies.find(ntf => searchedUsers.find(sUsr => (
                    sUsr._id === ntf.user._id
                )))
                ) {
                    setIsLoad(true)
                    await createNotify({
                        title: `Хотите стать ${user.role === 'teacher' ?
                            'учеником у' :
                            'учителем для'} ${user.username}`,
                        content: 'confirm',
                        recipients: searchedUsers.map(user => user._id)
                    }, token)
                    await nullifySearchedUsers()
                    setIsLoad(false)
                }
                else setErr('Этот пользователь отправил вам приглашение')
            }
            else setErr('Пользователь уже добавлен')
        }
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
                    <button disabled={isLoad} onClick={setUsers}>{
                        !isLoad ?
                            popupButton :
                            <img src={loading} alt='load' />}</button>
                </div>
            </div>
        </Portal>
    )
}