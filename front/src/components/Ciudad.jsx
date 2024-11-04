import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../services/api';

export default function Ciudad({ city }) {
  var { ciudadId } = useParams();
  var cities = city;
	const [res, setRes] = useState({});

	useEffect(() => {
		if(city.length === 0) {
			getData();
		} else if(city[0]?.id !== parseInt(ciudadId)) {
			getData();
		} else {
			onFilter(ciudadId);
		}
	}, [])

	async function getData() {
		api.get(`/history/${ciudadId}`)
		.then(res => res.data)
		.then(res => {
			setRes({
				name: res.name,
				temp: res.weather[0]?.temperature,
				weather: res.weather[0]?.weather,
				wind: res.weather[0]?.wind,
				clouds: res.weather[0]?.clouds,
				latitud: res.weather[0]?.latitud,
				longitud: res.weather[0]?.longitud,
			})
		})
	}

  function onFilter(ciudadId) {
    let ciudad = cities.filter((c) => c.id === parseInt(ciudadId));
    if (ciudad.length > 0) {
      setRes({...ciudad[0]}) ;
    } else {
      return null;
    }
  }

  return (
    <div className="ciudad">
      <div className="container">
        <h2 style={{textTransform: 'capitalize'}}>
					{res.name}
				</h2>
        <div className="info">
          <div>Temperatura: {res.temp} ºC</div>
          <div>Clima: {res.weather}</div>
          <div>Viento: {res.wind} km/h</div>
          <div>Cantidad de nubes: {res.clouds}</div>
          <div>Latitud: {res.latitud}º</div>
          <div>Longitud: {res.longitud}º</div>
        </div>
      </div>
    </div>
  );
}
