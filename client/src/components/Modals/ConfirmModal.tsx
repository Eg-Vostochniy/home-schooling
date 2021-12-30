import { useRef } from "react"
import { useClickOutside } from "../../hooks/useClickOutside"
import { Portal } from "./Portal"

type Props = {
    onAccept: () => void
    onRefuse: () => void
    onClose: () => void
}

export const ConfirmModal: React.FC<Props> = ({ children, onAccept, onRefuse, onClose }) => {
    const ref = useRef<HTMLDivElement>(null)
    useClickOutside(ref, onClose)
    return (
        <Portal>
            <div className='popup_block'>
                <div className='confirm_modal' ref={ref}>
                    {children}
                    <div>
                        <button onClick={onAccept}>Подтвердить</button>
                        <button onClick={onRefuse}>Отменить</button>
                    </div>
                </div>
            </div>
        </Portal>
    )
}