import { Dispatch, SetStateAction } from 'react';
import ProductList from '../models/ProductList';

export default class Cart {
    private productQuantityMap: Map<string, number>;
    private dispatch?: Dispatch<SetStateAction<Cart>>;

    constructor(cart: Cart | undefined = undefined) {
        if (cart)
            this.productQuantityMap = cart.productQuantityMap;
        else
            this.productQuantityMap = new Map<string, number>();
    }

    updateContext() {
        if (this.dispatch)
            this.dispatch(new Cart(this));
    }

    setDispatch(dispatch: Dispatch<SetStateAction<Cart>>) {
        this.dispatch = dispatch
    }

    addToCart(id: string, count = 1) {
        let currentQuantity = this.productQuantityMap.get(id);
        if (!currentQuantity)
            currentQuantity = 0;
        this.productQuantityMap.set(id, currentQuantity + count);
        this.updateContext();
    }

    /** Remove all quantity of a Product */
    removeProduct(id: string): boolean {
        const result = this.productQuantityMap.delete(id);
        this.updateContext();
        return result;
    }

    /** Remove a limited quantity of a Product */
    removeAmountFromCart(id: string, count = 1) {
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
        this.updateContext();
    }

    removeUnavailableProductFromCart(productList: ProductList) {
        Array.from(this.productQuantityMap.keys())
            .filter((productId) => !productList.getProductById(productId))
            .forEach((productId) => this.removeProduct(productId));

        this.updateContext();
        // Array.from(this.keys()).forEach((id: string) => {
        //     if (!productList.getProductById(id)) {
        //         this.removeAllFromCart(id);
        //     }
        // });
    }

    getProductQuantity(productId: string): number | undefined {
        return this.productQuantityMap.get(productId);
    }

    getEntries(): [string, number][] {
        return Array.from(this.productQuantityMap.entries());
    }

    getTotalProduct(): number {
        return Array.from(this.productQuantityMap.values()).reduce((sum, current) => sum + current, 0);
    }
}