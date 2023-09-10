import React from "react";
import { db } from "../../firebaseConfig";
import { movieGetType } from "../../interfaces/movieInterface";

const moviesReference = db.collection('filmes');
const generoFilmeReference = db.collection('generoFilme');

export function getMoviesObserver (
    callback: React.Dispatch<React.SetStateAction<movieGetType[]>>
) {

    moviesReference.onSnapshot((snapshot) => {
        const movies: movieGetType[] = [];
        snapshot.forEach((doc) => {
            movies.push({
                ...(doc.data() as movieGetType),
                id: doc.id
            });
        });
        callback(movies);
    });
}

//TODO: observer do generofilme
export function getMoviesWGenresObserver (
    callback: React.Dispatch<React.SetStateAction<movieGetType[]>>
) {
    generoFilmeReference.onSnapshot((snapshot) => {
        const movies: any[] = [];
        snapshot.forEach((doc) => {
            movies.push({
                titulo: doc.data().titulo,
                ano: doc.data().ano,
                descricao: doc.data().descricao,
                imagem: doc.data().imagem,
                genero: doc.data().genero,
                id: doc.id
            });

            // movies.push({
            //     ...(doc.data() as movieGetType),
            //     id: doc.id
            // })
        });
        callback(movies);
    });
}