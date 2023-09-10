import React, { useEffect, useState } from "react";
import { addMoviesAction, deleteMoviesAction } from "../../services/actions/movieAction";
import BotaoDD from "../../commons/BotaoDD";
import { getMoviesObserver } from "../../services/observers/moviesObserver";
import { movieGetType } from "../../interfaces/movieInterface";
import MoviesTable from "../../components/MoviesTable";

import './style.css'
import Modal from "../../components/Modal";
import Navbar from "../../components/Navbar";
import MovieCard from "../../components/MovieCard";
import { ModalProvider, useModal } from "../../components/ModalContext";

const MoviesPage: React.FC = () => {

    const [movies, setMovies] = useState<movieGetType[]>([]);

    
    useEffect(() => {
        getMoviesObserver(setMovies, [2023, 2022]);
    }, []);
    
    return <>
        <Navbar homeStr='../' addStr='../adicionarFilme' searchStr='../consultarFilme' userStr='../perfil'/>
        <ModalProvider>
            <h1>Filmes</h1>
            <div className="movies-page-container">
                <MoviesTable movies={movies} />
            </div>
            <Modal>
                oi
            </Modal>
        </ModalProvider>
    </> 
} 

export default MoviesPage;