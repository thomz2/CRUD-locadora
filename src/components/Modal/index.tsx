import React, { useState } from 'react'

import './style.css'
import BotaoDD from '../../commons/BotaoDD';
import InputDD from '../../commons/InputDD';
import { useModal } from '../ModalContext';

interface IProps {
  children: any;
}

const Modal: React.FC<IProps> = ({ children }) => {
  
  const { isOpen, openModal, closeModal, isDelete, movie } = useModal();

  const [textMovie, setMoviePlan] = useState<string>('');
  const handlerMovieText = (e: React.FormEvent<HTMLInputElement>) => {
    setMoviePlan(e.currentTarget.value);
  }

  if (isOpen)
    return (
      <div className='movie-post-modal-container'>
        <div className='movie-post-modal-closer' onClick={closeModal}></div>
        <div className='movie-post-modal-content'>
          { isDelete &&
            <p>DELETAR</p>
          }
          { !isDelete &&
            <p>CONFIGURAR</p>
          }
          { movie && 
            <p>{movie.titulo}: {movie.id}</p>
          }
        </div>
      </div>
    )
  else
    return null;
}

export default Modal;
