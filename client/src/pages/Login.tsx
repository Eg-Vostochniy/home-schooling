import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FormSubmit, InputChange } from "../App"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { valid } from "../utils/valid"

export const Login = () => {
    const [lgValue, setValue] = useState({
        email: '',
        password: ''
    })
    const [inputErrs, setInputErrs] = useState<string[]>([])

    const [isShowed, setIsShowed] = useState(false)
    const navigate = useNavigate()

    const { login } = useAppDispatch()

    const handleChangeInput = (e: InputChange) => {
        const { name, value } = e.target
        setValue({ ...lgValue, [name]: value })
    }

    const handleShowPassword = () => {
        setIsShowed(!isShowed)
    }

    const handleSubmit = async (e: FormSubmit) => {
        e.preventDefault()
        const { errs, errsLength } = valid.login(lgValue)

        if (errsLength > 0) {
            setInputErrs(errs)
        }
        else {
            await login(lgValue)
            navigate('/')
        }
    }

    return (
        <div className='auth'>
            <form onSubmit={handleSubmit}>
                <h2>Вход</h2>
                <label>
                    <span>Электронная почта</span>
                    <input
                        type='text'
                        name='email'
                        value={lgValue.email}
                        onChange={handleChangeInput}
                    />
                </label>

                <label className='password_label'>
                    <span>Пароль</span>
                    <input
                        type={isShowed ? 'text' : 'password'}
                        name='password'
                        value={lgValue.password}
                        onChange={handleChangeInput}
                    />
                    <small onClick={handleShowPassword}>
                        {isShowed ? 'Спрятать' : 'Показать'}
                    </small>
                </label>

                <span className='redirect'>Нет аккаунта?
                    <Link to='/register'>Зарегистрироваться</Link>
                </span>
                <button type='submit'>Войти</button>
                {
                    inputErrs.length > 0 && (
                        <div className='errors'>
                            {
                                inputErrs.map(err => (
                                    <div key={err}>* {err}</div>
                                ))
                            }
                        </div>
                    )
                }
            </form>
        </div>
    )
}

