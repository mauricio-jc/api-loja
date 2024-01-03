import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Generated('uuid')
  uuid: string;

  @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ name: 'username', type: 'varchar', length: 100, nullable: false })
  username: string;

  @Column({ name: 'email', type: 'varchar', length: 100, nullable: false })
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ name: 'roles', type: 'json', nullable: false })
  roles: string[];

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
