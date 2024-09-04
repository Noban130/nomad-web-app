import React from 'react'
import './InputContainer.css'

const InputContainer = ({ name, type = 'text', value, setValue, message, error, required = false }) => {
    return (
        <div className={'textInputContainer'}>
            <p className={'label'}>{name}</p>
            <input type={type} className={'input'} onChange={e => setValue(e.target.value)} value={value} required={required} />
            {
                (message || error) &&
                <p className={error ? 'error' : 'normal'}>{ error ? error : message }</p>
            }
        </div>
    )
}

export default InputContainer