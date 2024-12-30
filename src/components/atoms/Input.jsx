
const Input = ({ name, id, type, max, placeholder, onChange, onBlur}) => {

    return <input
        className={'py-2 px-3 w-full text-blue-light font-semibold tracking-wide outline-none rounded-sm'}
        name={name}
        id={id}
        type={type}
        maxLength={max}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
    />
}

export default Input;