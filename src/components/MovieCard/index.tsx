import React from 'react';
import { movieGetType } from '../../interfaces/movieInterface';
import { IoMdRemove } from 'react-icons/io'

import './style.css'

interface IProps {
    filme: movieGetType;
    onClick?: () => void;
}

const MovieCard: React.FC<IProps> = ({ filme, onClick }) => {
    return (
        <div className="movie-card">
            <div
                className="movie-background"
                style={{ backgroundImage: `url(${filme.imagem})` }}
            >
                {onClick && (
                    <button className="remove-button" onClick={onClick}>
                        <IoMdRemove />
                    </button>
                )}
            </div>
            <div className="movie-details">
                <h2 className="movie-title">{filme.titulo}</h2>
                <p className="movie-description">{filme.descricao}</p>
                <p className="movie-year">Ano: {filme.ano}</p>
            </div>
        </div>
    );
};

export default MovieCard;
