import { axios } from "../lib/axios.lib";



class ProductService{
     async getProducts(){
        const response = await axios.get(`/products`);
        return response;
     }
}

export default new ProductService()