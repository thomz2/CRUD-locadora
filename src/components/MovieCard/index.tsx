import React from 'react';
import { movieGetType } from '../../interfaces/movieInterface';
import { FaTimes } from 'react-icons/fa'
import { BsFillGearFill } from 'react-icons/bs'

import './style.css'

interface IProps {
    filme: movieGetType;
    onRemove?: () => void;
    onConfig?: () => void;
}

const MovieCard: React.FC<IProps> = ({ filme, onRemove, onConfig }) => {
    return (
        <div className="movie-card">
            <div
                className="movie-background"
                style={{ backgroundImage: `url(${filme.imagem})` }}
            >
                {onConfig && (
                    <button className="config-button" onClick={onConfig}>
                        <BsFillGearFill />
                    </button>
                )}
                {onRemove && (
                    <button className="remove-button" onClick={onRemove}>
                        <FaTimes />
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
