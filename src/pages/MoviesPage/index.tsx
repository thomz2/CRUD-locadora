import React, { useEffect, useState } from "react";
import { addMoviesAction, deleteMoviesAction } from "../../services/actions/movieAction";
import BotaoDD from "../../commons/BotaoDD";
import { getMoviesObserver } from "../../services/observers/moviesObserver";
import { movieGetType } from "../../interfaces/movieInterface";
import MoviesTable from "../../components/MoviesTable";

import './style.css'
import MoviePostModal from "../../components/MoviePostModal";


const MoviesPage: React.FC = () => {

    const [movies, setMovies] = useState<movieGetType[]>([]);
    
    useEffect(() => {
        getMoviesObserver(setMovies, [2023, 2022]);
    }, []);
    
    return <div className="movies-page-container">
        <MoviePostModal />
        <MoviesTable movies={movies}/>
        <BotaoDD text='Adicionar' onClick={() => addMoviesAction({
            titulo: 'teste',
            ano: 2020,
            descricao: 'bla bla bla',
        })} />
    </div>
} 

export default MoviesPage;