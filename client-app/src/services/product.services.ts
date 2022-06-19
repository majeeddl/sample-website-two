import { IProduct } from "../interfaces/product.interface";
import { axios } from "../lib/axios.lib";

class ProductService {
  /*
   */
  async getProducts(): Promise<IProduct[]> {
    const response: any = await axios.get(`/products`);
    return response;
  }

  async getProduct(id: number): Promise<IProduct> {
    const response: any = await axios.get(`/products/${id}`);
    return response;
  }

  async createProduct(product: any) {
    const response = await axios.post(`/products`, product);
    return response;
  }

  async updateProduct(id: number, product: any) {
    const response = await axios.patch(`/products/${id}`, product);
    return response;
  }

  async deleteProduct(id: number) {
    const response = await axios.delete(`/products/${id}`);
    return response;
  }
}

export default new ProductService();
