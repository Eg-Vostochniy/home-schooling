import { useState } from "react"
import { InputChange } from "../App"
import { Avatar } from "../components/Avatar"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { checkImage, imageUpload } from "../utils/imageUpload"
import loading from '../img/Spinner-1s-200px.gif'
import camera from '../img/photo-camera-interface-symbol-for-button.png'

const EditProfile: React.FC = () => {
    const { avatar, username, fullname } = useAppSelector(state => state.authReducer.user)
    const { token, user } = useAppSelector(state => state.authReducer)
    const { alert, updateAuthedUser } = useAppDispatch()

    const [profileValues, setProfileValues] = useState({
        username,
        fullname
    })
    const [avatarPh, setAvatarPh] = useState<File>()
    const [isLoad, setIsLoad] = useState(false)

    const handleChangeAvatar = (e: any) => {
        const file = e.target.files[0]
        const err = checkImage(file)

        if (err) alert({ error: err })
        setAvatarPh(file)
    }

    const handleChange = (e: InputChange) => {
        const { value, name } = e.target
        setProfileValues({ ...profileValues, [name]: value })
    }
    const handleSubmit = async () => {
        setIsLoad(true)
        const media = await imageUpload(avatarPh)

        updateAuthedUser({
            ...user,
            ...profileValues,
            avatar: media ? media.url : user.avatar
        }, token)
        setIsLoad(false)
    }
    return (
        <div className='edit_profile'>
            <div className='edit_image'>
                <Avatar url={avatarPh ? URL.createObjectURL(avatarPh) : avatar} size='big' />
                <span>
                    <p>Изменить</p>
                    <input
                        type='file'
                        id='file_up'
                        accept='image/*'
                        onChange={handleChangeAvatar}
                    />
                </span>
            </div>
            <div className='edit_content'>
                <label>
                    <span>Имя пользователя</span>
                    <input
                        type='text'
                        name='username'
                        value={profileValues.username}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <span>Полное имя</span>
                    <input
                        type='text'
                        name='fullname'
                        value={profileValues.fullname}
                        onChange={handleChange}
                    />
                </label>
                <button disabled={isLoad} onClick={handleSubmit}>
                    {isLoad ? <img src={loading} alt='load' /> : 'Редактировать'}
                </button>
            </div>
        </div>
    )
}

export default EditProfile


