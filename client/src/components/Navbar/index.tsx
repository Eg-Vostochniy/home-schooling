import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import logo from '../../img/Group.png'
import { Avatar } from "../Avatar"
import { Notify } from "./Notify"

const nav = [
    { name: 'Главная', path: '/' },
    { name: 'Сообщения', path: '/messages' },
    { name: 'Ред. профиль', path: '/edit_profile' }
]

export const Navbar: React.FC = () => {
    const [isNotifyActive, setIsNotifyActive] = useState(false)

    const { logout } = useAppDispatch()
    const { username, avatar } = useAppSelector(state => state.authReducer.user)

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const handleLogout = () => {
        logout()
    }

    const isActive = (path: string) => {
        if (path === pathname) return 'active'
        return ''
    }

    const handleChangeNav = (path: string) => {
        setIsNotifyActive(false)
        navigate(path)
    }

    const handleNotify = () => {
        isNotifyActive ? setIsNotifyActive(false) : setIsNotifyActive(true)
    }

    return (
        <>
            {
                <div className='navbar'>
                    <div className="primary_nav">
                        <div className='logo'>
                            <img src={logo} alt='logo' />
                            <h1>Teached</h1>
                        </div>
                        <div className="auth_user">
                            <Avatar url={avatar} size='small' />
                            <span>{username}</span>
                        </div>
                        <nav>
                            <ul>
                                {
                                    nav.map((n, index) => (
                                        <li
                                            key={index}
                                            className={isActive(n.path) ? 'active' : ''}
                                            onClick={() => handleChangeNav(n.path)}
                                        >
                                            {n.name}
                                        </li>
                                    ))
                                }
                                <li
                                    id='notify_nav-li'
                                    className={isNotifyActive ? 'active' : ''}
                                    onClick={handleNotify}
                                >Уведомления
                                    {
                                        isNotifyActive && <Notify />
                                    }
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="secondary_nav">
                        <div onClick={handleLogout}>Выход</div>
                    </div>
                </div>
            }
        </>
    )
}


