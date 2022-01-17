export const PRODUCTS_KEY = "products";
export const regexPrice = /^\d+(\.\d{1,2})?$/;

export default class Product {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly desc: string,
        public readonly price: string) {
    }
}

export const formatProductPrice = (price: string) => (Number.parseInt(price) / 100).toFixed(2);
