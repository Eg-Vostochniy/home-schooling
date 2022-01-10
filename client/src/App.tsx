import { ChangeEvent, FormEvent, Suspense, lazy, useEffect } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AddLessonResults } from "./components/Modals/AddLessonResult/AddLessonResults"
import { Alert } from "./components/Modals/Alert"
import { Loading } from "./components/Modals/Alert/Loading"
import { Navbar } from "./components/Navbar"
import { useAppDispatch } from "./hooks/useAppDispatch"
import { useAppSelector } from "./hooks/useAppSelector"
import { useAuth } from "./hooks/useAuth"
import { Home } from "./pages/Home"
import Login from "./pages/Login"
import './styles/global.css'

const Register = lazy(() => import('./pages/Register'))
const EditProfile = lazy(() => import('./pages/EditProfile'))
const Messages = lazy(() => import('./pages/Messages'))

export const App: React.FC = () => {
  const isAuth = useAuth()
  const { pathname } = useLocation()

  const isLessonResult = useAppSelector(state => state.academicPerformanceReducer.isOpen)
  const { getNotifies, getLessons, getPerformances } = useAppDispatch()

  const PrivateRoute = (props: any) => {
    return isAuth ? props.children : <Navigate to='/login' />
  }
  const PublicRoute = (props: any) => {
    if (pathname === '/login' && isAuth) return <Navigate to='/' />
    return !isAuth ? props.children : <Navigate to='/' />
  }

  useEffect(() => {
    if (isAuth) {
      getNotifies(isAuth)
      getLessons(isAuth)
      getPerformances(isAuth)
    }
    //eslint-disable-next-line
  }, [isAuth])

  return (
    <div className='App'>
      <Alert />
      <div className={isAuth ? 'main' : ''}>
        {isAuth && <Navbar />}
        {isLessonResult && <AddLessonResults />}

        <Routes>
          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        </Routes>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
            <Route path='/edit_profile' element={<PrivateRoute><EditProfile /></PrivateRoute>} />
            <Route path='/messages' element={<PrivateRoute><Messages /></PrivateRoute>} />
          </Routes>
        </Suspense>

      </div>
    </div>
  )
}

export type FormSubmit = FormEvent<HTMLFormElement>
export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

