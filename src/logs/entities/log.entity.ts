import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;
}
