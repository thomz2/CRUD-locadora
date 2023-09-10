import firebase from 'firebase'; 

export interface movieType {
    titulo: string;
    ano: number;
    descricao: string;
    imagem: string;
}

export interface movieAddType {
    titulo: string;
    ano: number;
    descricao: string;
    imagem: string;
}

export interface movieGetType {
    titulo: string;
    ano: number;
    descricao: string;
    id: string
    imagem: string;
}

export interface GeneroFilmeAddType {
    idFilme: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
    idGenero: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
}

// TODO: fazer logica desse enquanto faço lista de filmes
export interface GeneroFilmeGetType {
    filme: movieGetType;
    idGenero?: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
    genero: string
}