import React, { useEffect, useState } from "react";
import Cards from './Cards';
import api from "../services/api";

export default function Historie({cityChange}) {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    api.get('/history/last')
    .then((res) => res.data)
    .then(res => {
      const cities = res.map((city) => {
        return {
          min: Math.round(city.weather[0]?.min_temperature),
          max: Math.round(city.weather[0]?.max_temperature),
          img: city.weather[0]?.image,
          id: city.id,
          wind: city.weather[0]?.wind,
          temp: city.weather[0]?.temperature,
          name: city.name,
          weather: city.weather[0].weather,
          clouds: city.weather[0].clouds,
          latitud: city.weather[0].latitud,
          longitud: city.weather[0].longitud,
        }
      })
      setHistories([...cities])
    })
  }, [cityChange])

  return (
    <div>
      <Cards cities={histories} />
    </div>
  )
}