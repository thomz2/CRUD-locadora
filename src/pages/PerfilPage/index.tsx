import React, { useEffect, useState } from 'react';

import './style.css'
import Navbar from '../../components/Navbar';
import { getMoviesAction } from '../../services/actions/movieAction';

const UserProfile: React.FC = () => {

    const [qtdFilmes, setQtdFilmes] = useState<number>(NaN)

    useEffect(() => {
        getMoviesAction().then((res) => setQtdFilmes(res.length));
    }, [])
    

    // Dados mockados do usuário
    const user = {
        loterica: 'Locadora DD',
        nome: 'Joao',
        email: 'joao@gmail.com',
        idade: 30,
        cidade: 'Fortaleza',
        estado: 'Ceará',
    };

    return (
        <>
        <Navbar homeStr='../' addStr='../adicionarFilme' searchStr='../consultarFilme' userStr='../perfil'/>
        <div className="profile">
            <h2>{user.loterica}</h2>
            <div className="user-info">
                <p><strong>Nome:</strong> {user.nome}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Idade:</strong> {user.idade}</p>
                <p><strong>Cidade:</strong> {user.cidade}</p>
                <p><strong>Estado:</strong> {user.estado}</p>
                <p><strong>Quantidade de Filmes:</strong> {qtdFilmes}</p>
                
            </div>
        </div>
        </>
    );
};

export default UserProfile;
