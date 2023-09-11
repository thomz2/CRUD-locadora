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