import { AddingBlock } from '../components/Home/AddingBlock'
import { HomeContent } from '../components/Home/HomeContent'
import { useAppSelector } from '../hooks/useAppSelector'


export const Home: React.FC = () => {
    const { role } = useAppSelector(state => state.authReducer.user)

    if (role === 'teacher') {
        return (
            <div className='home'>
                <AddingBlock
                    titleCont='Мои ученики'
                    addingMenuCont='Ученики'
                    addUserPopup='Добавить ученика'
                    addGroupPopup='Создать группу'
                />
                <HomeContent
                    content='Для планирования уроков в расписании сначала добавьте учеников'
                    btnContent='Добавить ученика'
                />
            </div>
        )
    }
    else {
        return (
            <div className='home'>
                <AddingBlock
                    titleCont='Мои учителя'
                    addingMenuCont='Учителя'
                    addUserPopup='Добавить учителя'
                    addGroupPopup='Вас еще не добавили в группу'
                />
                <HomeContent
                    content='Сначала добавьте учителя'
                    btnContent='Добавить учителя'
                />
            </div>
        )
    }
}


