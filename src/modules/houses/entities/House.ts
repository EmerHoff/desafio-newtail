import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Lord } from '../../lords/entities/Lord';

@Entity('houses')
export class House {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  region: string;

  @Column()
  founded_in: number;

//   @Column('uuid')
//   user_id: string;

  @OneToOne(() => Lord, lord => lord.id)
  @JoinColumn({ name: 'lord_id' })
  lord_id: Lord;

//   @OneToOne(() => Lord, lord => lord.id)
//   lord_id: Lord;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}