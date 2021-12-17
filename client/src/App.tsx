import { ChangeEvent, FormEvent, Suspense, lazy } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { Alert } from "./components/Modals/Alert"
import { Loading } from "./components/Modals/Alert/Loading"
import { Navbar } from "./components/Navbar"
import { useAuth } from "./hooks/useAuth"
import { Home } from "./pages/Home"
import Login from "./pages/Login"
import { Messages } from "./pages/Messages"
import { Users } from "./pages/Users"
import './styles/global.css'

const Register = lazy(() => import('./pages/Register'))

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

        <Routes>
          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/users' element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        </Routes>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          </Routes>
        </Suspense>

      </div>
    </div>
  )
}

export type FormSubmit = FormEvent<HTMLFormElement>
export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

