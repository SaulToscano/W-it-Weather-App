import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Weather } from './weather.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @CreateDateColumn()
  createdAt: Date; // Columna de fecha de creación

  @OneToMany(() => Weather, (weather) => weather.city)
  weather: Weather[];
}
