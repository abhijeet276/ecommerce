import React from 'react';
import './CustomButton.scss'

export interface ICustomButton
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onCLick?: () => void
}

const CustomButton: React.FC<ICustomButton> = (props) => {
    const { type, disabled, children, onCLick, ...rest } = props
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onCLick}
            className='customButton'
            {...rest}>
            {children}
        </button>
    )
}

export default CustomButton