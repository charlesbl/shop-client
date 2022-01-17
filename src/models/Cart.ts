import { Dispatch, SetStateAction } from 'react';
import ProductList from '../models/ProductList';
import { setLocalData } from '../utils';

export const CART_KEY = "cart";

export default class Cart {
    private productQuantityMap: Map<string, number>;
    private dispatch?: Dispatch<SetStateAction<Cart>>;

    constructor(productQuantityMap: Map<string, number> | undefined = undefined) {
        if (productQuantityMap)
            this.productQuantityMap = productQuantityMap;
        else
            this.productQuantityMap = new Map<string, number>();
    }

    updateContext() {
        const array = Array.from(this.productQuantityMap.entries());
        setLocalData(CART_KEY, array);
        if (this.dispatch)
            this.dispatch(new Cart(this.productQuantityMap));
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