import React, { useEffect, useState } from 'react';

import './style.css'
import Navbar from '../../components/Navbar';
import { getMoviesAction } from '../../services/actions/movieAction';

const UserProfile: React.FC = () => {

    const [qtdFilmes, setQtdFilmes] = useState<number>(NaN);

    useEffect(() => {
        getMoviesAction().then((res) => setQtdFilmes(res.length));
    }, []);


    
    // dados mockados do usuário
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
            <div className='h2-container'>

                <h2>{user.loterica}</h2>
            </div>
            <div className="user-info">
                <ul className='ul-perfil'>
                    <li className='li-perfil'><p><strong>Usuario:</strong> {user.nome}</p></li>
                    <li className='li-perfil'><p><strong>Email:</strong> {user.email}</p></li>
                    <li className='li-perfil'><p><strong>Idade:</strong> {user.idade}</p></li>
                    <li className='li-perfil'><p><strong>Cidade:</strong> {user.cidade}</p></li>
                    <li className='li-perfil'><p><strong>Estado:</strong> {user.estado}</p></li>
                    <li className='li-perfil'><p><strong>Filmes disponíveis:</strong> {qtdFilmes}</p></li>
                </ul>
            </div>
        </div>
        </>
    );
};

export default UserProfile;
