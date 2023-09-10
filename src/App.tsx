import React, { useEffect, useState } from 'react';
import './App.css';
import { getMoviesObserver } from './services/observers/moviesObserver';
import { movieAddType, movieGetType, movieType } from './interfaces/movieInterface';
import MoviesPage from './pages/MoviesPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PerfilPage from './pages/PerfilPage';
import MovieAddPage from './pages/MovieAddPage';
import { addMoviesAction } from './services/actions/movieAction';

function App() {

  const [movies, setMovies] = useState<movieGetType[]>([]);

  useEffect(() => {
    getMoviesObserver(setMovies, [2023, 2022]);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MoviesPage/>} />
        <Route path='/adicionarFilme' element={<MovieAddPage />} />
        <Route path='/perfil' element={<PerfilPage />} />
      </Routes>
    </Router>
  );
}

export default App;
