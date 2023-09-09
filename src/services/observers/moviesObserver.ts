import React from "react";
import { db } from "../../firebaseConfig";
import { movieGetType } from "../../interfaces/movieInterface";

const moviesReference = db.collection('filmes');

export function getMoviesObserver (callback: React.Dispatch<React.SetStateAction<movieGetType[]>>, moviesYears: number[]) {

    // const ref = db.collection('filmes').doc();
    // console.log(ref);

    moviesReference.where('ano','not-in', moviesYears).onSnapshot((snapshot) => {
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

// export function getMoviesGenresObserver