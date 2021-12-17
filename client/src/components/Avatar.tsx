export const Avatar: React.FC<{ url: string, size: string }> = ({ url, size }) => {
    return (
        <>
            <img className={size} src={url} alt="avatar" />
        </>
    )
}


