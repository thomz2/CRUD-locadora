import { GeneroFilmeAddType, movieGetType, movieType } from "../../interfaces/movieInterface";
import { addMoviesAcess, getMoviesAcess, setMoviesAcess, updateMoviesAcess, deleteMoviesAcess, getGeneroFilmeListAcess } from "../dataAcess/moviesAcess";

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

// ACHO QUE NAO FUNCIONA
export async function getMoviesByGenreAction(genero: string) {
    const movies = await getMoviesAction();
    const generoFilmeList = await getGeneroFilmeListAcess();

    const filmesFiltrados: any[] = [];
    generoFilmeList.forEach(async (doc) => {
        const generoFilmeAtual: any = doc.data();
        try {
            const filmeSnapshot = await generoFilmeAtual.FilmeRef.get();
            if (filmeSnapshot.exists) {
                const filmeData = filmeSnapshot.data();
                try {
                    const generoSnapshot = await generoFilmeAtual.GeneroRef.get();
                    if (generoSnapshot.exists) {
                        const generoData = generoSnapshot.data();

                        // logica para retornar as coisas agora:
                        if (generoData.genero == genero) {
                            filmesFiltrados.push({
                                ...(filmeData as movieGetType),
                                id: filmeSnapshot.id 
                            });
                            // console.log('FILME ADICIONADO: ', filmesFiltrados[filmesFiltrados.length-1])
                        } 
                    }
                } catch (error) {
                    console.log('erro ao tentar pegar dados de referencia ao genero')
                }
            }
        } catch (error) {
            console.log('erro ao tentar pegar dados da referencia ao filme:', error);
        }
    });

    return filmesFiltrados;

}

// deletar referencias de generoFilme 
export async function deleteMoviesAction(id: string) {
    const response = await deleteMoviesAcess(id);
    return response;
}