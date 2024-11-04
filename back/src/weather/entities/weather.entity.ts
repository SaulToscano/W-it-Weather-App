import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { City } from './city.entity';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => City, (city) => city.weather)
  city: City;

  @Column('float')
  temperature: number;

  @Column('float')
  min_temperature: number;

  @Column('float')
  max_temperature: number;

  @Column('int')
  humidity: number;

  @Column()
  weather_condition: string;

  @Column('float')
  wind: number;

  @Column()
  weather: string;

  @Column('int')
  clouds: number;

  @Column('float')
  latitud: number;

  @Column('float')
  longitud: number;

  @Column()
  image: string;

  @CreateDateColumn()
  recorded_at: Date;
}
