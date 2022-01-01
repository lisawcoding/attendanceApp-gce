
const Input = ({label, name, type, placeholder, handleChange,  defaultValue, required, autoFocus }) => {
    return (
        <label>
            <span>{label}</span>
            <input 
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={handleChange} 
                defaultValue={defaultValue} 
                required = {required}
                autoFocus={autoFocus}
            />
        </label>
    )
}

export default Input;