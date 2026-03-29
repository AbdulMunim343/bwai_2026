import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Registration } from './registration.entity';
import { Event } from './event.entity';

@Entity('workshops')
export class Workshop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  venue: string;

  @Column({ type: 'int' })
  max_capacity: number;

  @Column({ default: 'upcoming' })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  event_id: string;

  @ManyToOne(() => Event, (e) => e.workshops, { nullable: true })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @OneToMany(() => Registration, (r) => r.workshop)
  registrations: Registration[];
}
