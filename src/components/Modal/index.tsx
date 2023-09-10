import React, { useState, useEffect } from 'react'

import './style.css'
import BotaoDD from '../../commons/BotaoDD';
import InputDD from '../../commons/InputDD';
import { useModal } from '../ModalContext';
import { deleteMoviesAction } from '../../services/actions/movieAction';

interface IProps {
}

const Modal: React.FC<IProps> = () => {

  const { isOpen, openModal, closeModal, isDelete, movie } = useModal();

  const [confirmText, setConfirmText] = useState<string>('');
  const handlerMovieText = (e: React.FormEvent<HTMLInputElement>) => {
    setConfirmText(e.currentTarget.value);
  }

  // para limpar formulario de exclusão
  useEffect(() => {
    setConfirmText('');

  }, [isOpen])


  const confirmarExclusão = (id: string) => {
    deleteMoviesAction(id)
      .then(() => console.log(id, 'deletado!'))
      .catch((error) => console.log('erro na confirmacao de exclusao:', error));

    closeModal();
  }

  if (isOpen)
    return (
      <div className='movie-modal-container'>
        <div className='movie-modal-closer' onClick={closeModal}></div>
        {isDelete &&
          <div className='movie-modal-content delete' >
            <header>
              <h4>DELETAR</h4>
            </header>

            {movie &&
              <>
                {/* <p>{movie.titulo}: {movie.id}</p> */}
                <div className='flexbox'>

                  <InputDD
                    placeholder={`${movie.titulo}`}
                    value={confirmText}
                    onChange={handlerMovieText}
                  > {`Digite `} <strong>{`${movie.titulo}`}</strong> {` para confirmar exclusão`} </InputDD>
                  <BotaoDD
                    text='Confirmar'
                    onClick={confirmText == movie.titulo ? () => confirmarExclusão(movie.id) : () => { }}
                    className={confirmText == movie.titulo ? 'botao-pode-confirmar' : 'botao-nao-pode-confirmar'}
                  />
                </div>
              </>
            }
          </div>
        }

        {/* Parte da configuração */}
        {!isDelete &&
          <div className='movie-modal-content config'>
            <h4>CONFIGURAR</h4>

            {movie &&
              <p>{movie.titulo}: {movie.id}</p>
            }
          </div>
        }

      </div>
    )
  else
    return null;
}

export default Modal;
