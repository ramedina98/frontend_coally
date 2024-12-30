
const Label = ({ children, htmlFor }) => {
    return <label
        className='text-slate-100 tracking-wide font-medium text-lg'
        htmlFor={htmlFor}
        >
            {children}
        </label>;
}

export default Label;