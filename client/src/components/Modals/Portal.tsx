import { useEffect, useState } from "react"
import ReactDOM from 'react-dom'

export const Portal: React.FC = ({ children }) => {
    const [container] = useState(() => document.createElement('div'))

    useEffect(() => {
        document.body.appendChild(container)
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.removeChild(container)
            document.body.style.overflow = 'unset'
        }
        //eslint-disable-next-line
    }, [])

    return ReactDOM.createPortal(children, container)
}
