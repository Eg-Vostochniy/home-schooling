import { useCallback, useState } from "react"
import { useAppSelector } from "../../../hooks/useAppSelector"
import { AddButton } from "../../AddButton"
import { Popup } from "../../Modals/Popup"
import { SearchStudents } from "./SearchStudents"

export const AddUserPopup: React.FC = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const { searchedUsers } = useAppSelector(state => state.userReducer)
    const { role } = useAppSelector(state => state.authReducer.user)

    const handleClose = useCallback(() => {
        setIsOpen(false)
    }, [])
    const handleOpen = useCallback(() => {
        setIsOpen(true)
    }, [])
    return (
        <>
            <AddButton handleOpen={handleOpen}>{children}</AddButton>
            {
                isOpen && (
                    <Popup
                        onClose={handleClose}
                        popupName={role === 'student' ? 'Выберите учителя' : 'Выберите ученика'}
                        popupButton={role === 'student' ? 'Добавить учителя' : 'Добавить ученика'}
                        searchedUsers={searchedUsers}
                    >
                        <SearchStudents addedSearchedUsers={searchedUsers} />
                    </Popup>
                )
            }
        </>
    )
}