import { memo, useState } from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { Avatar } from "../Avatar"
import { AddGroupPopup } from "./AddGroupModal/AddGroupPopup"
import { AddUserPopup } from "./AddUserModal/AddUserPopup"
import ava from '../../img/mad-scientist 2.png'

type Props = {
    titleCont: string
    addingMenuCont: string
    addUserPopup: string
    addGroupPopup: string
}

export const AddingBlock: React.FC<Props> = memo((props) => {
    const { titleCont, addingMenuCont, addUserPopup, addGroupPopup } = props

    const { deleteUser } = useAppDispatch()
    const { roleUsers, role, groupAddedUsers } = useAppSelector(state => state.authReducer.user)
    const { token } = useAppSelector(state => state.authReducer)

    const [active, setActive] = useState(1)
    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const [delUserId, setDelUserId] = useState('')

    const arr = [
        { id: 1, name: addingMenuCont, className: 'add_user' },
        { id: 2, name: 'Группы', className: 'add_group' }
    ]

    const handleDeleteModal = (id: string) => {
        setDelUserId(id)
        setIsDeleteModal(true)
    }
    const handleDeleteUser = () => {
        deleteUser(delUserId, token)
    }

    return (
        <div className='adding_block'>
            <div className='adding_menu-title'>
                <h4>{titleCont}</h4>
                <div className='adding_menu'>
                    {
                        arr.map(a => (
                            <span
                                className={`${a.className} ${active === a.id ? 'active' : ''}`}
                                key={a.id}
                                onClick={() => setActive(a.id)}
                            >{a.name}
                            </span>
                        ))
                    }
                </div>
            </div>
            <div className="adding_info">
                <div className='adding_info-buttons'>
                    <AddUserPopup>{addUserPopup}</AddUserPopup>
                    {
                        role === 'teacher' ?
                            <AddGroupPopup>{addGroupPopup}</AddGroupPopup> : ''
                    }
                </div>
                {
                    active === 1 ?
                        roleUsers.length === 0 ?
                            <AddUserPopup>{addUserPopup}</AddUserPopup> :
                            <div className='added_users'>
                                {roleUsers.map(user => (
                                    <div key={user._id} className='added_user-block'>
                                        <span onClick={() => handleDeleteModal(user._id)}>X</span>
                                        <Avatar url={user.avatar} size='medium' />
                                        <span>{user.username}</span>
                                        <span>{user.fullname}</span>
                                    </div>
                                ))}
                            </div>
                        :
                        groupAddedUsers.length === 0 ?
                            <AddGroupPopup>{addGroupPopup}</AddGroupPopup> :
                            <div className='added_users'>
                                {groupAddedUsers.map(user => (
                                    <div className='added_user-block'>
                                        <Avatar url={ava} size="medium" />
                                    </div>
                                ))}
                            </div>
                }
                {
                    isDeleteModal && <div className='delete_modal'>
                        <span>Хотите удалить этого пользователя?</span>
                        <button onClick={handleDeleteUser}>Да</button>
                        <button onClick={() => setIsDeleteModal(false)}>Отмена</button>
                    </div>
                }
            </div>
        </div>
    )
})