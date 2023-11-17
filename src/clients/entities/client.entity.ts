import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum StatusType {
  Pending = 1,
  Approved = 2,
  Disapproved = 3,
  Adjusted = 4,
}

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Generated('uuid')
  uuid: string;

  @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: false })
  phone: string;

  @Column({ name: 'document', type: 'varchar', length: 20, nullable: false })
  document: string;

  @Column({ name: 'age', type: 'int', nullable: false })
  age: number;

  @Column({
    name: 'status_id',
    type: 'enum',
    enum: StatusType,
    default: StatusType.Pending,
  })
  status_id: StatusType;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
