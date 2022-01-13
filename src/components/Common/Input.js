
const Input = ({label, name, type, placeholder, handleChange,  defaultValue, required, autoFocus, disabled }) => {
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
                disabled={disabled}
            />
        </label>
    )
}

export default Input;