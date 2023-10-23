import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";
import { IsString } from "class-validator";

@Entity()
export class Todos {

  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  id: number;

  @IsString()
  @Column({
    type: 'varchar',
    length: 630,
  })
  contents: string;

  @Column({
    type: 'date',
    default: () => '(CURRENT_DATE)',
  })
  date: Date;

  @Column({
    type: 'int',
    name: 'UserId',
    unsigned: true,
  })
  UserId: number;

  @Index('todos_userid_fk_idx')
  @ManyToOne(() => Users, users => users.Todos, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'UserId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'todos_userid_fk',
  })
  User: Users;
}