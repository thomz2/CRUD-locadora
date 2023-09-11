import React, { createContext, useContext, useState } from 'react';
import { movieGetType, movieType } from '../../interfaces/movieInterface';

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isDelete: boolean;
  setDelete: () => void;
  setConfig: () => void;
  movie: movieGetType | null;
  setFilme: (arg0: movieGetType) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface IProps {
    children: any;
};

export const ModalProvider: React.FC<IProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [movie, setMovie] = useState<movieGetType | null>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMovie(null);
  };

  const setDelete = () => {
    setIsDelete(true);
  };

  const setConfig = () => {
    setIsDelete(false);
  };

  const setFilme = (filme: movieGetType) => {
    setMovie(filme);
  }

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, isDelete, setDelete, setConfig, movie, setFilme }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal precisa ser usado com um ModalProvider');
  }
  return context;
};
