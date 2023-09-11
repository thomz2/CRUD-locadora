import firebase from "firebase";
import { db } from "../../firebaseConfig";
import { movieAddType, movieType } from "../../interfaces/movieInterface";
import 'firebase/storage';

const moviesReferences = db.collection('filmes');
const generoFilmeReferences = db.collection('generoFilme');
const storage = firebase.storage();

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

export async function getGeneroFilmeListAcess() {
    const response = await generoFilmeReferences.get();
    return response;
}

// deletar referencias de generoFilme e imagem
export async function deleteMoviesAcess(id: string) {

    const deletePromises:Promise<void>[]  = [];
    const MovieRef = moviesReferences.doc(id);

    const response = await MovieRef.delete();


    // logica para apagar todos os generofilme com a chave do filme apagado
    generoFilmeReferences.where('FilmeRef', '==', MovieRef).onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
            deletePromises.push(doc.ref.delete());
        });
    });
    
    await Promise.all(deletePromises);
    

    const imgRef = storage.ref().child(`images/${id}`);
    
    imgRef.delete()
        .then(() => {
            console.log('Imagem', id, 'excluida!');
        })
        .catch((error) => {
            console.error('erro ao excluir imagem no deleteMovieAcess:', error);
        });

    return response;
};

export async function deleteMovieGenresAcess(id: string) {

    const MovieRef = moviesReferences.doc(id);

    const deletePromises:Promise<void>[]  = [];

    // logica para apagar todos os generofilme com a chave do filme apagado
    generoFilmeReferences.where('FilmeRef', '==', MovieRef).onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
            deletePromises.push(doc.ref.delete());
        });
    });

    const promises = await Promise.all(deletePromises);
    return promises[promises.length-1]
}