import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { State } from '../types/state.type';

@Entity({ name: 'issues' })
export class IssueEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, type: 'varchar' })
    title: string;

    @Column({ length: 200, type: 'varchar' })
    description: string;

    @Column({ default: State.OPEN, enum: State, type: 'enum' })
    state: State;
}
