import React, { useState } from 'react';

import './app.css';
import Nav from './components/Nav.jsx';
import Cards from './components/Cards.jsx';
import Ciudad from './components/Ciudad.jsx';
import Historie from './components/Historie.jsx';
import { Route, Routes } from 'react-router-dom';
import api from '../src/services/api.js';

function App() {
  const [cities, setCities] = useState([]);
  function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id !== id));
  }
  function onSearch(ciudad) {
    //Llamado a la API del clima
    try {
      api
        .get(`/${ciudad}`)
        .then((res) => res.data)
        .then((recurso) => {
          if (recurso.main !== undefined) {
            const ciudad = {
              min: Math.round(recurso.main.temp_min),
              max: Math.round(recurso.main.temp_max),
              img: recurso.weather[0].icon,
              id: recurso.id,
              wind: recurso.wind.speed,
              temp: recurso.main.temp,
              name: recurso.name,
              weather: recurso.weather[0].main,
              clouds: recurso.clouds.all,
              latitud: recurso.coord.lat,
              longitud: recurso.coord.lon,
            };
            setCities((oldCities) => [...oldCities, ciudad]);
          } else {
            alert("Ciudad no encontrada");
          }
        }).finally(() => {
          handleSave(ciudad);
        });
    } catch (error) {
      console.error(error);
    }
  }

  const handleSave = async (ciudad) => {
    try {
      api.post(`/${ciudad}`);
    } catch (error) {
      console.error('Error saving weather data:', error);
    }
  }
  
  return (
    <div className="App">    
      <Nav onSearch={onSearch}/>
      <Routes>
        <Route path='/' element={<Cards cities={cities} onClose={onClose}/>}/>
        <Route path='/ciudad/:ciudadId' element={<Ciudad city={cities}/>}/>
        <Route path='/historie' element={<Historie cityChange={cities} />} />
      </Routes>
    </div>
  );
}

export default App;
