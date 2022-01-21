export const PRODUCTS_KEY = "products";

export default class IProduct {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly desc: string,
        public readonly price: string) {
    }
}

export const isValidProduct = (product: IProduct) => /^\d*$/.test(product.price);
export const formatProductPrice = (price: string) => `${(Number.parseInt(price) / 100).toFixed(2)} €`;
export const getProductById = (productList: Array<IProduct>, id: string) => productList.find(p => p.id === id);
