import React from 'react'

import './style.css'

interface IProps {
  text: string;
  onClick?: any;
  className?: string;
}

const BotaoDD: React.FC<IProps> = ({text = ' ', onClick, className}) => {
  return (
    <>
      <button className={'botao-DD ' + className} onClick={onClick}>{text}</button>
    </>
  )
}

export default BotaoDD;