import { useState } from "react"
import { InputChange } from "../App"
import { Avatar } from "../components/Avatar"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { checkImage, imageUpload } from "../utils/imageUpload"

const EditProfile: React.FC = () => {
    const { avatar, username, fullname, email, roleUsers } = useAppSelector(state => state.authReducer.user)
    const { alert } = useAppDispatch()

    const [profileValues, setProfileValues] = useState({
        username,
        fullname,
        email
    })
    const [avatarPh, setAvatarPh] = useState<File>()

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
        const media = await imageUpload(avatarPh)
        if (media) {

        }
    }
    return (
        <div className='edit_profile'>
            <Avatar url={avatar} size='big' />
            <input type='file' alt='avatar' onChange={handleChangeAvatar} />
            <div>
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
                <label>
                    <span>Эл. почта</span>
                    <input
                        type='text'
                        name='email'
                        value={profileValues.email}
                        onChange={handleChange}
                    />
                </label>
                <button onClick={handleSubmit}>Go</button>
            </div>
            <div>
                <div className='added_users'>
                    {roleUsers.map(user => (
                        <div key={user._id} className='added_user-block'>
                            <Avatar url={user.avatar} size='medium' />
                            <span>{user.username}</span>
                            <span>{user.fullname}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EditProfile


