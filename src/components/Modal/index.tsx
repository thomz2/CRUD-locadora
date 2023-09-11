// TODO: Feito na pressa, organizar depois

import React, { useState, useEffect } from 'react'

import './style.css'
import BotaoDD from '../../commons/BotaoDD';
import InputDD from '../../commons/InputDD';
import { useModal } from '../ModalContext';
import { deleteMovieGenresAction, deleteMoviesAction, setMoviesAction } from '../../services/actions/movieAction';
import TextAreaDD from '../../commons/TextAreaDD';
import { getMovieGenresObserver } from '../../services/observers/moviesObserver';
import { db } from "../../firebaseConfig";
import firebase from 'firebase/app';
import 'firebase/storage';
import { error } from 'console';
import { movieType } from '../../interfaces/movieInterface';


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

  // estados para a modificação do filme
  const [id, setId] = useState<string>('');
  const [titulo, setTitulo] = useState<string>('');
  const [tituloAntigo, setTituloAntigo] = useState<string>('');
  const [ano, setAno] = useState<number>(NaN);
  const [descricao, setDescricao] = useState<string>('');
  const [imagem, setImagem] = useState<string | ArrayBuffer | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);

  useEffect(() => {
    if (isOpen && movie) {
      setId(movie.id);
      setTitulo(movie.titulo);
      setTituloAntigo(movie.titulo);
      setAno(movie.ano);
      setDescricao(movie.descricao);
      setImagem(movie.imagem);
    }
  }, [movie]);
  
  const storage = firebase.storage();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const arquivo = e.dataTransfer.files[0];

    if (arquivo) {

      setImgFile(arquivo);

      const reader = new FileReader();
      reader.onload = (e) => {

        const resultado = e.target?.result;

        if (resultado)
          setImagem(e.target?.result);
      };

      reader.readAsDataURL(arquivo);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.FormEvent) => {

    // função auxiliar para update
    function aux(valor: string) {
      const novoFilme: movieType = {
        titulo,
        ano,
        descricao,
        imagem: valor
      };
      console.log('FILME ALTERADO: ', novoFilme);
      setMoviesAction(novoFilme, id);
    }

    e.preventDefault();

    if (movie) {

      const storageRef = storage.ref();
      const fileName = `${id}`
      const imageRef = storageRef.child(`images/${fileName}`);

      if (imgFile)
        imageRef.put(imgFile)
          .then((snapshot) => {
            snapshot.ref.getDownloadURL()
              .then((valor) => {
                const novoFilme: movieType = {
                  titulo,
                  ano,
                  descricao,
                  imagem: valor
                };

                setMoviesAction(novoFilme, id);
                const generoFilmeReferences = db.collection('generoFilme');
                generoFilmeReferences.get()
                  .then((lista) => {
                    lista.forEach((doc) => {
                      const data = doc.data()
                      if (data.titulo == tituloAntigo) {
                        console.log(tituloAntigo, doc.data().genero);

                        const refAtual = doc.ref;
                        console.log(doc.ref);
                        refAtual.set({
                          FilmeRef: data.FilmeRef,
                          GeneroRef: data.GeneroRef,
                          ano: ano,
                          descricao: descricao,
                          genero: data.genero,
                          imagem: imagem,
                          titulo: titulo
                        })

                      }
                    })
                  })
              })
              .catch((error) => console.log('erro no getDownloadURL: ', error));
          })
          .catch((error) => console.log('erro no put imgFile: ', error))
      else {
        const novoFilme: movieType = {
          titulo,
          ano,
          descricao,
          imagem: imagem as string
        };

        setMoviesAction(novoFilme, id);
        const generoFilmeReferences = db.collection('generoFilme');
        generoFilmeReferences.get()
          .then((lista) => {
            lista.forEach((doc) => {
              const data = doc.data()
              if (data.titulo == tituloAntigo) {
                console.log(tituloAntigo, doc.data().genero);

                const refAtual = doc.ref;
                console.log(doc.ref);
                refAtual.set({
                  FilmeRef: data.FilmeRef,
                  GeneroRef: data.GeneroRef,
                  ano: ano,
                  descricao: descricao,
                  genero: data.genero,
                  imagem: imagem,
                  titulo: titulo
                })

              }
            })
          })
      }

    }

    setId('');
    setTitulo('');
    setTituloAntigo('');
    setAno(NaN);
    setDescricao('');
    setImagem(null);
    setImgFile(null);
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
                  > 
                    {`Digite `} <strong style={{ userSelect: 'none' }}>{`${movie.titulo}`}</strong> {` para confirmar exclusão`} 
                  </InputDD>
                  <BotaoDD
                    text='Confirmar'
                    onClick={confirmText == movie.titulo ? () => confirmarExclusão(movie.id) : () => {}}
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
            <header>
              <h4>Alterar dados</h4>
            </header>

            {/* COMECO */}
            <div className="form-container">
              <div>
                <InputDD
                  label='Título:'
                  placeholder='Digite o título do filme'
                  value={titulo}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setTitulo(e.currentTarget.value)}
                />
              </div>
              <div>
                <InputDD
                  label='Ano'
                  placeholder='Digite o ano do filme'
                  type='number'
                  value={Number.isNaN(ano) ? '' : ano}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setAno(parseInt(e.currentTarget.value))}
                />
              </div>
              <div>
                <TextAreaDD
                  label='Descrição:'
                  placeholder='Digite a descrição do filme'
                  value={descricao}
                  onChange={(e: React.FormEvent<HTMLTextAreaElement>) => setDescricao(e.currentTarget.value)}
                />

              </div>
              <div>
                <div className='dd-container'>
                  <label htmlFor="imagem">Imagem:</label>
                  <div
                    className="drop-area"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    {!imagem ? (
                      <p>Solte uma imagem aqui</p>
                    ) : (
                      <div className='image-container-alt'>
                        <img
                          src={imagem as string}
                          alt="Imagem"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='div-botao-dd-container'>
                <BotaoDD text='Alterar Filme' 
                  onClick={ 
                    (titulo == '' || Number.isNaN(ano) || descricao == '' ) ? 
                    () => {} : handleChange
                  } 
                  className={
                    !(titulo == '' || Number.isNaN(ano) || descricao == '' ) ? 
                    'botao-pode-confirmar' : 'botao-nao-pode-confirmar'
                  }
                />
              </div>
            </div>
            {/* FIM */}
          </div>
        }

      </div>
    )
  else
    return null;
}

export default Modal;
