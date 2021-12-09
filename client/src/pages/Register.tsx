import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FormSubmit, InputChange } from "../App"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { valid } from "../utils/valid"

export const Register = () => {
    const [lgValue, setValue] = useState({
        username: '',
        fullname: '',
        email: '',
        password: '',
        cf_password: '',
        role: 'teacher'
    })
    const [inputErrs, setInputErrs] = useState<string[]>([])

    const [isShowed, setIsShowed] = useState(false)

    const { register } = useAppDispatch()
    const navigate = useNavigate()

    const handleChangeInput = (e: InputChange) => {
        const { value, name } = e.target
        if (name === 'username')
            setValue({ ...lgValue, [name]: value.toLowerCase().replace(/ /g, '') })
        else
            setValue({ ...lgValue, [name]: value })
    }

    const handleShowPassword = () => {
        setIsShowed(!isShowed)
    }

    const handleSubmit = async (e: FormSubmit) => {
        e.preventDefault()
        const { errs, errsLength } = valid.register(lgValue)

        if (errsLength > 0) {
            setInputErrs(errs)
        }
        else {
            await register(lgValue)
            navigate('/home')

        }
    }

    return (
        <div className='auth'>
            <form onSubmit={handleSubmit}>
                <h2>Регистрация</h2>
                <label>
                    <span>Имя пользователя</span>
                    <input
                        type='text'
                        name='username'
                        value={lgValue.username}
                        onChange={handleChangeInput}
                    />
                </label>

                <label>
                    <span>Полное имя</span>
                    <input
                        type='text'
                        name='fullname'
                        value={lgValue.fullname}
                        onChange={handleChangeInput}
                    />
                </label>

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

                <label>
                    <span>Повторите пароль</span>
                    <input
                        type={isShowed ? 'text' : 'password'}
                        name='cf_password'
                        value={lgValue.cf_password}
                        onChange={handleChangeInput}
                    />
                </label>

                <span>Выберите роль</span>
                <label className='role'>
                    <span>Учитель</span>
                    <input
                        type='radio'
                        defaultChecked
                        name='role'
                        value='teacher'
                        onChange={handleChangeInput}
                    />
                </label>
                <label className='role'>
                    <span>Ученик</span>
                    <input
                        type='radio'
                        name='role'
                        value='student'
                        onChange={handleChangeInput}
                    />
                </label>

                <span className='redirect'>Есть аккаунт?
                    <Link to='/login'>Войти</Link>
                </span>
                <button type='submit'>Зарегистрироваться</button>
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

