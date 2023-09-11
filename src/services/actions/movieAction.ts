import { movieGetType, movieType } from "../../interfaces/movieInterface";
import { addMoviesAcess, getMoviesAcess, setMoviesAcess, updateMoviesAcess, deleteMoviesAcess, getGeneroFilmeListAcess, deleteMovieGenresAcess } from "../dataAcess/moviesAcess";

export async function addMoviesAction(body: movieType) {
    const response = await addMoviesAcess(body);
    return response.id;
}

export async function setMoviesAction(body: movieType, id: string) {
    const response = await setMoviesAcess(body, id);
    return response;
}

export async function updateMoviesAction(body: movieType, id: string) {
    const response = await updateMoviesAcess(body, id);
    return response;
}

export async function getMoviesAction() {
    const response = await getMoviesAcess();
    const movies: any[] = [];
    response.forEach((doc) => {
        movies.push(doc.data())
    });
    return movies;
}

// deletar referencias de generoFilme 
export async function deleteMoviesAction(id: string) {
    const response = await deleteMoviesAcess(id);
    return response;
}

export async function deleteMovieGenresAction(id: string) {
    const response = await deleteMovieGenresAcess(id);
    return response;
}