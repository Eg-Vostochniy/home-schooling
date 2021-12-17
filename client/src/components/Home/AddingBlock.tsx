import { AddGroupPopup } from "./AddGroupModal/AddGroupPopup"
import { AddUserPopup } from "./AddUserModal/AddUserPopup"

export const AddingBlock: React.FC = () => {
    return (
        <div className='adding_block'>
            <div className='adding_menu-title'>
                <h4>Мои ученики</h4>
                <div className='adding_menu'>
                    <span>Ученики</span>
                    <span>Группы</span>
                </div>
            </div>
            <div className="adding_info">
                <div className='adding_info-buttons'>
                    <AddUserPopup>Добавить ученика</AddUserPopup>
                    <AddGroupPopup>Создать группу</AddGroupPopup>
                </div>
                <AddUserPopup>Добавить ученика</AddUserPopup>
            </div>
        </div>
    )
}