import React, { useEffect, useState } from "react";
import { addMoviesAction, deleteMoviesAction } from "../../services/actions/movieAction";
import BotaoDD from "../../commons/BotaoDD";
import { getMoviesObserver } from "../../services/observers/moviesObserver";
import { movieGetType } from "../../interfaces/movieInterface";
import MoviesTable from "../../components/MoviesTable";

import './style.css'
import MoviePostModal from "../../components/MoviePostModal";
import Navbar from "../../components/Navbar";
import MovieCard from "../../components/MovieCard";


const MoviesPage: React.FC = () => {

    const [movies, setMovies] = useState<movieGetType[]>([]);
    
    useEffect(() => {
        getMoviesObserver(setMovies, [2023, 2022]);
    }, []);
    
    return <>
        <Navbar homeStr='../' addStr='../adicionarFilme' searchStr='../consultarFilme' userStr='../perfil'/>
        <div className="movies-page-container">
            <MoviesTable movies={movies}/>
            
        </div>
    </> 
} 

export default MoviesPage;