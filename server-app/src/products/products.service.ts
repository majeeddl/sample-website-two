import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './interfaces/product.intreface';

@Injectable()
export class ProductsService {
  private products: IProduct[] = [
    {
      id: 1,
      title: 'Product One',
      description: 'This is a description for product One.',
      price: 1000,
    },
    {
      id: 2,
      title: 'Product Two',
      description: 'This is a description for product Two',
      price: 1200,
    },
    {
      id: 3,
      title: 'Product Three',
      description: 'This is a description for product Three',
      price: 800,
    },
  ];

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find(product => product.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
