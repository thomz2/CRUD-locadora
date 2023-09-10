import { db } from "../../firebaseConfig";
import { movieAddType, movieType } from "../../interfaces/movieInterface";

const moviesReferences = db.collection('filmes');
const generoFilmeReferences = db.collection('generoFilme');

export async function addMoviesAcess(body: movieType) {

    const movieObject : movieAddType = {
        titulo: body.titulo,
        ano: body.ano,
        descricao: body.descricao,
        imagem: body.imagem
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
        imagem: body.imagem
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
        imagem: body.imagem
        // GeneroFilme: db.collection('generoFilme').doc(body.idGeneroFilme)
    }

    const response = await moviesReferences.doc(id).update(movieObject);
    return response;
};

export async function getMoviesAcess() {
    const response = await moviesReferences.get();
    return response;
};

// deletar referencias de generoFilme 
export async function deleteMoviesAcess(id: string) {

    const MovieRef = moviesReferences.doc(id);
    const response = await MovieRef.delete();

    const deletePromises:Promise<void>[]  = [];

    // logica para apagar todos os generofilme com a chave do filme apagado
    generoFilmeReferences.where('FilmeRef', '==', MovieRef).onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
            deletePromises.push(doc.ref.delete());
        });
        Promise.all(deletePromises);
    });

    return response;
};