import React from 'react';
import { FaUser, FaHome } from 'react-icons/fa';
import { LuPlusSquare } from 'react-icons/lu';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import './style.css';

interface IProps {
    homeStr: string,
    addStr: string,
    searchStr: string,
    userStr: string
};

const Navbar: React.FC<IProps> = ({homeStr, addStr, searchStr, userStr}) => {

    const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="left-buttons">
        <button className="nav-button" onClick={() => navigate(homeStr)}>
            <FaHome />
        </button>
        <button className="nav-button" onClick={() => navigate(addStr)}>
            <LuPlusSquare />
        </button>
      </div>
      <div className="right-button">
        <button className="nav-button" onClick={() => navigate(userStr)}>
            <FaUser />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
