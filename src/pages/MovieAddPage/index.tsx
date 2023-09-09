import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { movieAddType, movieType } from '../../interfaces/movieInterface';
import InputDD from '../../commons/InputDD';
import { db } from "../../firebaseConfig";

import firebase from 'firebase/app';
import 'firebase/storage';

import './style.css'
import TextAreaDD from '../../commons/TextAreaDD';
import BotaoDD from '../../commons/BotaoDD';
import { addMoviesAction, setMoviesAction } from '../../services/actions/movieAction';
import Navbar from '../../components/Navbar';

interface IProps {
    onAdicionarFilme: (filme: movieAddType) => void;
}

// const MovieAddPage: React.FC<IProps> = ({ onAdicionarFilme }) => {
const MovieAddPage: React.FC = () => {
    const [titulo, setTitulo] = useState<string>('');
    const [ano, setAno] = useState<number>(NaN);
    const [descricao, setDescricao] = useState<string>('');
    const [idGeneroFilme, setIdGeneroFilme] = useState<string>('');
    const [imagem, setImagem] = useState<string | ArrayBuffer | null>(null);
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [generos, setGeneros] = useState<string[]>([]);

    useEffect(()=> {
        console.log('generos selecionados: ', generos);
    }, [generos])

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

    const toggleGenero = (e: React.FormEvent, genero: string) => {
        e.preventDefault();

        if (generos.includes(genero)) {
            setGeneros(generos.filter((item) => item !== genero));
        } else {
            setGeneros([...generos, genero]);
        }

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newMovieRef = db.collection('filmes').doc();

        const novoFilme: movieType = {
            titulo,
            ano,
            descricao,
        }

        setMoviesAction(novoFilme, newMovieRef.id);

        // fazer upload da imagem
        const storageRef = storage.ref();
        const fileName = `${newMovieRef.id}`
        const imageRef = storageRef.child(`images/${fileName}`);

        if (imgFile)
            imageRef.put(imgFile)
                .then((snapshot) => console.log("URL: ", snapshot.ref.getDownloadURL()))
                .catch((error) => console.log('erro no put imgFile: ', error))

        // depois de setar o filme e a imagem, seta a relação do filme com os generos
        generos.forEach((g) => {
            // instancia o novo GF
            const newGFRef = db.collection('generoFilme').doc();
            
            // instancia: referencia do genero atual do foreach
            const GenRef = db.collection('generos').doc(g);

            // setei o GF
            newGFRef.set({
                FilmeRef: newMovieRef,
                GeneroRef: GenRef
            }).catch((error) => console.log('erro no forEach dos generos: ', error));
        });

        setTitulo('');
        setAno(NaN);
        setDescricao('');
        setGeneros([]);
        setImagem(null);
        setImgFile(null);
    }

    return (
        <>
        <Navbar homeStr='../' addStr='../adicionarFilme' searchStr='../consultarFilme' userStr='../perfil'/>
        <div className="page-container">
            <div className="form-container">
                <h2>Adicionar Filme</h2>
                <form>
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
                    <div className="generos-container">
                        {['Ação', 'Comédia', 'Drama', 'Aventura', 'Suspense'].map((genero) => (
                            <button
                            key={genero}
                            className={generos.includes(genero) ? 'genero-selecionado' : ''}
                            onClick={(e) => toggleGenero(e, genero)}
                            >
                                {genero}
                            </button>
                        ))}
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
                                        <div className='image-container'>
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
                        <BotaoDD text='Adicionar Filme' onClick={handleSubmit} />
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default MovieAddPage;
