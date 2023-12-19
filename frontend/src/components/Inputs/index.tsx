import React from 'react'
import './InputFields.scss'

interface ICustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    change?: (name: string, value: unknown) => void,
    label: string,
    required: boolean,
}
const TextField: React.FC<ICustomInputProps> = (props) => {
    const { type, placeholder, name, value, label, required, change, ...rest } = props

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        change && change(String(name), val)
    }
    return (
        <div className='inputWrapper'>
            <label className='label'>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="inputField"
                {...rest}
            />
        </div>
    )
}

export default TextField
