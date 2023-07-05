import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Generated('uuid')
  uuid: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'image1', type: 'varchar', length: 255, nullable: false })
  image1: string;

  @Column({ name: 'image2', type: 'varchar', length: 255, nullable: true })
  image2: string;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.product, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  category: Category;
}
