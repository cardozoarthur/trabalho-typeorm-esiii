import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: number;

  @Column()
  description: string;

  @Column()
  buyPrice: number;

  @Column()
  sellPrice: number;

  // @Column({ array: true })
  // tags: Array<string>;

  @Column()
  lovers: number;
}
