import Product from "../shared/Product";

export default class ProductList extends Array<Product> {
    getProductById(id: string): Product | undefined {
        return this.find(p => p.id === id);
    }
}