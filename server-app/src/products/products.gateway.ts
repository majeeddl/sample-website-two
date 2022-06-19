import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { interval, map, Observable } from 'rxjs';
import { ParseIntPipe } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ProductsGateway {
  constructor(private readonly productsService: ProductsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('product:get')
  findOne(
    @MessageBody('id', ParseIntPipe) id: number,
  ): Observable<WsResponse<any>> {

    const getPrice = () => {
      let getProduct = this.productsService.findOne(id);
      const price = getProduct.price;
      const differ = Math.floor(Math.random() * (100 - -100) + -100);
      
      return {...getProduct, price: price + differ};
    };

    return interval(1000).pipe(
      map((item) => ({ event: 'product:get', data: getPrice() })),
    );
  }
}
