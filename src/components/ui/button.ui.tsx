import './Button.css'

type ButtonProps = {
    title: string | JSX.Element,
    className: string,
    onClick: () => void
}

const Button = ({title, className, onClick}: ButtonProps) => {

    return (
        <button className={`btn ${className}`} onClick={()=>onClick()}>
            {title}
        </button>
    )
}

export default Button