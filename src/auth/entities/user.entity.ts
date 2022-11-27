import { IsString } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;
  @Column('text')
  password: string;
  @Column('text', { select: true })
  fullName: string;
  @Column('boolean', { default: true })
  isActive: boolean;
  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }
  @BeforeUpdate()
  checkFieldsBeforeUpdate(){
    this.checkFieldsBeforeInsert()
  }
}
