import { IProduct } from "../interfaces/product.intreface";

export class CreateProductDto implements IProduct {
    id?: number;
    title: string;
    description: string;
    price: number;
}
