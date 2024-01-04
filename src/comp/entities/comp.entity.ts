import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Comp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-json')
  option;

  @Column({ type: 'text' })
  hash: string;
}
