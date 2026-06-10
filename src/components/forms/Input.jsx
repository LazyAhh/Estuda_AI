
export const Input = ({ id, label, type, placeholder, value, onChange, disabled }) => {
    return (
        <div>
            <label htmlFor={id}>{label}:</label>
            <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} />
        </div>
    )
}