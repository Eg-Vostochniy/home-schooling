export const valid = {
    register: (data: {
        username: string,
        fullname: string,
        email: string,
        password: string,
        cf_password: string
    }) => {
        let errs: string[] = []
        const { username, fullname, email, password, cf_password } = data

        if (!username) errs = [...errs, 'Введите имя пользователя']
        else if (username.length > 15) errs = [...errs, 'Имя пользователя больше 15 символов']

        if (!fullname) errs = [...errs, 'Введите полное имя']
        else if (fullname.length > 20) errs = [...errs, 'Полное имя больше 20 символов']

        if (!email) errs = [...errs, 'Введите электронную почту']
        else if (!validateEmail(email)) errs = [...errs, 'Невалидная эл.почта']

        if (password.length < 6) errs = [...errs, 'Пароль меньше 6 символов']
        else if (password !== cf_password) errs = [...errs, 'Пароли не совпадают']

        return { errs, errsLength: errs.length }
    },
    login: (data: { email: string, password: string }) => {
        let errs: string[] = []
        const { email, password } = data

        if (!email) errs = [...errs, 'Введите электронную почту']
        else if (!validateEmail(email)) errs = [...errs, 'Невалидная эл.почта']

        if (password.length < 6) errs = [...errs, 'Пароль меньше 6 символов']

        return { errs, errsLength: errs.length }
    }
}

function validateEmail(email: string) {
    //eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())
}
