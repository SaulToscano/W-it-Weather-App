import { Controller, Get, Param, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Weather } from './entities/weather.entity';
import { City } from './entities/city.entity';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('weather') // Etiqueta general para Swagger
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(':city')
  @ApiOperation({ summary: 'Obtener clima actual de una ciudad' })
  @ApiParam({ name: 'city', description: 'Nombre de la ciudad' })
  async getWeather(@Param('city') city: string): Promise<any> {
    return this.weatherService.getWeatherByCity(city);
  }

  @Post(':city')
  @ApiOperation({
    summary: 'Guardar clima actual de una ciudad en la base de datos',
  })
  @ApiParam({ name: 'city', description: 'Nombre de la ciudad' })
  async saveWeather(@Param('city') city: string): Promise<Weather> {
    return this.weatherService.saveWeatherData(city);
  }

  @Get('history/last')
  @ApiOperation({ summary: 'Obtener las últimas 10 ciudades buscadas' })
  async getLast10Cities(): Promise<City[]> {
    return this.weatherService.getLastCities();
  }

  @Get('history/:id')
  @ApiOperation({ summary: 'Obtener historial de clima para una ciudad' })
  @ApiParam({ name: 'id', description: 'id de la base de datos de la ciudad' })
  async getWeatherHistory(@Param('id') id: number): Promise<City> {
    return this.weatherService.getWeatherHistory(id);
  }
}
