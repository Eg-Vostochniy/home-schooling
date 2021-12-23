import { useEffect } from "react"

export const Loading: React.FC = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = 'unset' }
    }, [])

    return (
        <div className='loading'>
            <svg width='205' height='250' viewBox='0 0 40 50'>
                <polygon stroke='#fff' strokeWidth='1' fill='none' points='20,1 40,40 1,40' />
                <text fill='#fff' x='5' y='47'>Загрузка</text>
            </svg>
        </div>
    )
}


