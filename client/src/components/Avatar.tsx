export const Avatar: React.FC<{ url: string, size: string }> = ({ url, size }) => {
    return (
        <div className='avatar'>
            <img src={url} alt="avatar" />
        </div>
    )
}


