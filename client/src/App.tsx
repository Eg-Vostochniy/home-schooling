import { ChangeEvent, FormEvent, useEffect } from "react"
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom"
import { Alert } from "./components/Modals/Alert"
import { Navbar } from "./components/Navbar"
import { useAppDispatch } from "./hooks/useAppDispatch"
import { useAppSelector } from "./hooks/useAppSelector"
import { useAuth } from "./hooks/useAuth"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Messages } from "./pages/Messages"
import { Register } from "./pages/Register"
import { Users } from "./pages/Users"
import './styles/global.css'

export const App: React.FC = () => {
  const isAuth = useAuth()
  const { pathname } = useLocation()


  const PrivateRoute = (props: any) => {
    return isAuth ? props.children : <Navigate to='/login' />
  }
  const PublicRoute = (props: any) => {
    if (pathname === '/login' && isAuth) return <Navigate to='/' />
    return !isAuth ? props.children : <Navigate to='/' />
  }

  return (
    <div className='App'>
      <Alert />
      <div className={isAuth ? 'main' : ''}>
        {isAuth && <Navbar />}
        {
          isAuth ? <Routes>
            <Route
              path='/'
              element={<PrivateRoute><Home /></PrivateRoute>}
            />
            <Route path='/users' element={<PrivateRoute><Users /></PrivateRoute>} />
            <Route path='/messages' element={<Messages />} />
          </Routes> : <Routes>
            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          </Routes>
        }

      </div>
    </div>
  )
}

export type FormSubmit = FormEvent<HTMLFormElement>
export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

