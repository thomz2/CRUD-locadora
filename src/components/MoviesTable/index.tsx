import React from "react";
import { movieGetType } from "../../interfaces/movieInterface";
import BotaoDD from "../../commons/BotaoDD";
import { deleteMoviesAction } from "../../services/actions/movieAction";

import './style.css'

interface IProps {
    movies: movieGetType[];
}

const MoviesTable: React.FC<IProps> = ({movies}) => {
    return <>
        <table className="movies-table-container">
            <tr className="movies-table-header">
                <th>Titulo</th>
                <th>Ano</th>
                <th>Actions</th>
            </tr>

            {movies.map((elem) => (
                <tr className="movies-table-body">
                    <td>
                        <p>{elem.titulo}</p>
                    </td>
                    <td>
                        <p>{elem.ano}</p>
                    </td>
                    <td>
                        <BotaoDD text='Delete' onClick={() => deleteMoviesAction(elem.id)} />
                    </td>
                </tr>
            ))}
    
        </table>
    </>
}

export default MoviesTable;