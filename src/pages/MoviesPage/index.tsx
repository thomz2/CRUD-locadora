import React, { useEffect, useState } from "react";
import { addMoviesAction, deleteMoviesAction, getMoviesByGenreAction } from "../../services/actions/movieAction";
import BotaoDD from "../../commons/BotaoDD";
import { getMoviesObserver, getMoviesWGenresObserver} from "../../services/observers/moviesObserver";
import { movieGetType } from "../../interfaces/movieInterface";
import MoviesTable from "../../components/MoviesTable";

import './style.css'
import Modal from "../../components/Modal";
import Navbar from "../../components/Navbar";
import MovieCard from "../../components/MovieCard";
import { ModalProvider } from "../../components/ModalContext";

const MoviesPage: React.FC = () => {

    const [movies, setMovies] = useState<movieGetType[]>([]);
    const [moviesRepetidos, setMoviesRepetidos] = useState<any[]>([]);

    const generos: string[] = ['Aventura', 'Ação', 'Comédia', 'Drama', 'Suspense'];

    
    useEffect(() => {
        getMoviesObserver(setMovies);
        getMoviesWGenresObserver(setMoviesRepetidos);
        console.log(moviesRepetidos);
    }, []);

    return <>
        <Navbar homeStr='../' addStr='../adicionarFilme' searchStr='../consultarFilme' userStr='../perfil'/>
        <ModalProvider>
            <h1 className="movies-page-h1">Filmes</h1>
            <div className="movies-page-container">
                <MoviesTable movies={movies} />
            </div>

            { generos.map((gen) => {
                return (moviesRepetidos.some((filme) => filme.genero == gen) &&
                <>
                <h2 className="movies-page-h1">Filmes de {gen}</h2>
                <div className="movies-page-container">
                    <MoviesTable movies={moviesRepetidos.filter(filme => filme.genero == gen )} buttons={false}/>
                </div>
                </>)
            }) }

            <Modal />
        </ModalProvider>
    </> 
} 

export default MoviesPage;