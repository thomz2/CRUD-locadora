import React, { useState } from 'react'

import './style.css'
import BotaoDD from '../../commons/BotaoDD';
import InputDD from '../../commons/InputDD';

const MoviePostModal: React.FC = () => {

  const [textMovie, setMoviePlan] = useState<string>('');
  const handlerMovieText = (e: React.FormEvent<HTMLInputElement>) => {
    setMoviePlan(e.currentTarget.value);
  }

  return (
    <div className='movie-post-modal-container'>
        <div className='movie-post-modal-closer'></div>
        <div className='movie-post-modal-content'>
          <header>
            <h3>Adicionar novo filme</h3>
          </header>
          <form>
            <InputDD label='Nome do filme' placeholder='digite o texto do filme' value={textMovie} onChange={handlerMovieText}/>
            <BotaoDD text='Adicionar' />
          </form>
        </div>
    </div>
  )
}

export default MoviePostModal;
