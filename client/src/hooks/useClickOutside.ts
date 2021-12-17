import { RefObject, useEffect } from "react"

export const useClickOutside = (ref: RefObject<HTMLDivElement>, onClose: () => void) => {
    useEffect(() => {
        function clickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target))
                onClose()
        }

        document.addEventListener('mousedown', clickOutside)

        return () => { document.removeEventListener('mousedown', clickOutside) }
        //eslint-disable-next-line
    }, [ref])
}