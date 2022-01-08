import ProductList from '../models/ProductList';

export default class Cart {
    private productQuantityMap: Map<string, number>;
    private onCartUpdate: () => void;

    constructor() {
        this.productQuantityMap = new Map<string, number>();
        this.onCartUpdate = () => { };
    }

    setOnCartUpdate(f: () => void) {
        this.onCartUpdate = f;
    }

    addToCart(id: string, count: number = 1) {
        let currentQuantity = this.productQuantityMap.get(id);
        if (!currentQuantity)
            currentQuantity = 0;
        this.productQuantityMap.set(id, currentQuantity + count);
        this.onCartUpdate();

        console.log(this.productQuantityMap);
    }

    /** Remove all quantity of a Product */
    removeProduct(id: string): boolean {
        const result = this.productQuantityMap.delete(id);
        this.onCartUpdate();
        return result;
    }

    /** Remove a limited quantity of a Product */
    removeAmountFromCart(id: string, count: number = 1) {
        const currentQuantity = this.productQuantityMap.get(id);
        if (!currentQuantity) {
            //Product not in cart
            return;
        }
        const newQuantity = currentQuantity - count;
        if (newQuantity <= 0) {
            this.removeProduct(id);
        } else {
            this.productQuantityMap.set(id, newQuantity);
        }
        this.onCartUpdate();
    }

    removeUnavailableProductFromCart(productList: ProductList) {
        Array.from(this.productQuantityMap.keys())
            .filter((productId) => !productList.getProductById(productId))
            .forEach((productId) => this.removeProduct(productId));

        this.onCartUpdate();
        // Array.from(this.keys()).forEach((id: string) => {
        //     if (!productList.getProductById(id)) {
        //         this.removeAllFromCart(id);
        //     }
        // });
    }

    getEntries(): [string, number][] {
        return Array.from(this.productQuantityMap.entries());
    }

    getTotalProduct(): number {
        return Array.from(this.productQuantityMap.values()).reduce((sum, current) => sum + current, 0);
    }
}