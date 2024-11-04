import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { Weather } from './entities/weather.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  private readonly apiKey = process.env.OPENWEATHER_API_KEY;

  constructor(
    private httpService: HttpService,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(Weather)
    private weatherRepository: Repository<Weather>,
  ) {}

  async getLastCities(): Promise<City[]> {
    return this.cityRepository.find({
      order: { createdAt: 'DESC' }, // Ordena de las más recientes a las más antiguas
      take: 10, // Limita a las últimas 10 ciudades
      relations: ['weather'],
    });
  }

  async getWeatherByCity(cityName: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: cityName,
          appid: this.apiKey,
          units: 'metric',
        },
      }),
    );
    return response.data;
  }

  async getWeatherHistory(id: number): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: { id },
      relations: ['weather'],
    });

    if (!city) {
      throw new Error(`No weather data found for city id: ${id}`);
    }

    return city; // Retorna la lista de registros de clima asociados a la ciudad
  }

  async saveWeatherData(cityName: string): Promise<Weather> {
    const weatherData = await this.getWeatherByCity(cityName);

    let city = await this.cityRepository.findOne({ where: { name: cityName } });
    if (!city) {
      city = this.cityRepository.create({
        name: cityName,
        country: weatherData.sys.country,
      });
      await this.cityRepository.save(city);
    }

    const weather = this.weatherRepository.create({
      city,
      temperature: weatherData.main.temp,
      min_temperature: Math.round(weatherData.main.temp_min),
      max_temperature: Math.round(weatherData.main.temp_max),
      humidity: weatherData.main.humidity,
      weather_condition: weatherData.weather[0].description,
      image: weatherData.weather[0].icon,
      wind: weatherData.wind.speed,
      weather: weatherData.weather[0].main,
      clouds: weatherData.clouds.all,
      latitud: weatherData.coord.lat,
      longitud: weatherData.coord.lon,
    });
    return this.weatherRepository.save(weather);
  }
}
