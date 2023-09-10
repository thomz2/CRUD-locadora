import React from 'react'

import './style.css'
import Navbar from '../../components/Navbar';

const ConsultaPage: React.FC = () => {
  return (
    <>
        <Navbar homeStr='../' addStr='../adicionarFilme' searchStr='../consultarFilme' userStr='../perfil'/>
    </>
  )
}

export default ConsultaPage;