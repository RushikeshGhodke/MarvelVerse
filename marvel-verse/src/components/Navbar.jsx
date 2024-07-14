import React from 'react'
import MarvelLogo from '../assets/img/Marvel_Logo.svg.png';
import { ImSearch } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleLogoClick = () => {
    navigate('/');
  }

  return (
    <nav>
        <div className="nav-left"></div>
        <div className="nav-center">
          <img src={MarvelLogo} onClick={handleLogoClick} alt="Marvel Logo" className="nav-img" style={{ cursor: 'pointer' }}/>
        </div>
        <div className="nav-right">
          <ImSearch size={"1.5em"} onClick={handleSearchClick} color="white"  style={{ cursor: 'pointer' }}/>
        </div>
      </nav>
  )
}

export default Navbar