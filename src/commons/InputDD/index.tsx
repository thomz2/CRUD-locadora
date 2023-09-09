import React from 'react'

import './style.css'

interface IProps {
    label?: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void
    type?: string;
}

const InputDD: React.FC<IProps> = ({label, placeholder = '', type='text', value, onChange}) => {
  return (
    <div className='input-DD-container'>
        {(label && 
        <label>
            {label}
        </label>
        )}
        <input value={value} onChange={onChange} placeholder={placeholder}>
        
        </input>
    </div>
  )
}

export default InputDD;
