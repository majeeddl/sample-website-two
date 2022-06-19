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
    createProductDto.id = this.products.sort((a, b) => b.id - a.id)[0].id + 1;
    this.products.push(createProductDto);
    return createProductDto;
  }

  findAll() {
    return this.products.sort((a, b) => a.id - b.id);
  }

  findOne(id: number) {
    return this.products.find((product) => product.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    let getProduct = this.products.find((product) => product.id === id);
    getProduct = { ...getProduct, ...updateProductDto };
    return updateProductDto;
  }

  remove(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    this.products.splice(index, 1);
    return true;
  }
}
