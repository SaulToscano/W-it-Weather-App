import React from 'react';
import Logo from '../img/weather_logo.png'
import SearchBar from './SearchBar.jsx';
import { Link } from 'react-router-dom';
import '../css/nav.css';


function Nav({onSearch}) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link to='/'>
        <span className="navbar-brand">
          <img id="logoWeather" src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" />
          Saul - Weather App
        </span>
      </Link>
      <Link to='/historie'>Historie</Link>
      <SearchBar onSearch={onSearch} />
    </nav>
  );
};

export default Nav;
