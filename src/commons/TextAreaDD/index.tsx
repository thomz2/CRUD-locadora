import React from 'react'

import './style.css'

interface IProps {
    label?: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void
    type?: string;
}

const TextAreaDD: React.FC<IProps> = ({label, placeholder = '', type='text', value, onChange}) => {
  return (
    <div className='textarea-DD-container'>
        {(label && 
        <label>
            {label}
        </label>
        )}
        <textarea value={value} onChange={onChange} placeholder={placeholder}>
        
        </textarea>
    </div>
  )
}

export default TextAreaDD;
