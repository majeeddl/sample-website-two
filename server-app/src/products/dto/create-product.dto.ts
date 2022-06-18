import { IProduct } from "../interfaces/product.intreface";

export class CreateProductDto implements IProduct {
    title: string;
    description: string;
    price: number;
}
