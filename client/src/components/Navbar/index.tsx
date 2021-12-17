import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import logo from '../../img/Group.png'
import { Avatar } from "../Avatar"

export const Navbar: React.FC = () => {
    const [isNavbarActive, setIsNavbarActive] = useState(true)

    const { logout } = useAppDispatch()
    const { username, avatar } = useAppSelector(state => state.authReducer.user)

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const handleLogout = () => {
        logout()
    }

    const nav = [
        { name: 'Главная', path: '/' },
        { name: 'Пользователи', path: '/users' },
        { name: 'Сообщения', path: '/messages' }
    ]

    const isActive = (path: string) => {
        if (path === pathname) return 'active'
        return ''
    }

    const handleMenu = () => {
        setIsNavbarActive(!isNavbarActive)
    }

    return (
        <>
            {
                isNavbarActive ?
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
                                                onClick={() => navigate(n.path)}
                                            >
                                                {n.name}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </nav>
                        </div>
                        <div className="secondary_nav">
                            <div onClick={handleMenu}>Свернуть</div>
                            <div onClick={handleLogout}>Выход</div>
                        </div>
                    </div> :
                    <div className='burger_menu'>
                        <span onClick={handleMenu}>X</span>
                    </div>
            }
        </>
    )
}


