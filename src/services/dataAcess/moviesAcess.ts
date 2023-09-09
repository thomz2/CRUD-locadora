import { db } from "../../firebaseConfig";
import { movieAddType, movieType } from "../../interfaces/movieInterface";

const moviesReferences = db.collection('filmes');

export async function addMoviesAcess(body: movieType) {

    const movieObject : movieAddType = {
        titulo: body.titulo,
        ano: body.ano,
        descricao: body.descricao,
        // GeneroFilme: db.collection('generoFilme').doc(body.idGeneroFilme)
    }

    const response = await moviesReferences.add(movieObject);
    return response;
};

export async function setMoviesAcess(body: movieType, id: string) {

    const movieObject : movieAddType = {
        titulo: body.titulo,
        ano: body.ano,
        descricao: body.descricao,
        // GeneroFilme: db.collection('generoFilme').doc(body.idGeneroFilme)
    }

    const response = await moviesReferences.doc(id).set(movieObject);
    return response;
};

export async function updateMoviesAcess(body: movieType, id: string) {

    const movieObject : movieAddType = {
        titulo: body.titulo,
        ano: body.ano,
        descricao: body.descricao,
        // GeneroFilme: db.collection('generoFilme').doc(body.idGeneroFilme)
    }

    const response = await moviesReferences.doc(id).update(movieObject);
    return response;
};

export async function getMoviesAcess() {
    const response = await moviesReferences.get();
    return response;
};

export async function deleteMoviesAcess(id: string) {
    const response = await moviesReferences.doc(id).delete();
    return response;
};