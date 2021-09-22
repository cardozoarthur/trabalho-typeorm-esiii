import { EntityRepository, Repository } from 'typeorm';
import Product from '../models/Product';

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
  public async findById(id) {
    return this.find({ where: { id } })
  };

  public async findByCode(code) {
    return this.find({ where: { code } })
  };
};