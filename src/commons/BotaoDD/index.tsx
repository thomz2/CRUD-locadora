import React from 'react'

import './style.css'

interface IProps {
  text: string;
  // onClick?: () => void;
  onClick?: any;
}

const BotaoDD: React.FC<IProps> = ({text = ' ', onClick}) => {
  return (
    <>
      <button className='botao-DD' onClick={onClick}>{text}</button>
    </>
  )
}

export default BotaoDD;