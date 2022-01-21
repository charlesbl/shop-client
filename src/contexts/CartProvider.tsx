import React, { useState } from 'react';
import { addToCart, removeAmountFromCart, removeUnavailableProductFromCart } from '../models/Cart';
import { getLocalData, setLocalData } from '../utils';
import { useProducts } from './ProductsProvider';

type IContextCart = {
    getCartQuantity: (id: string) => number | undefined;
    getAll: () => IterableIterator<[string, number]>;
    addToCart: (id: string, count?: number) => void;
    removeAmountFromCart: (id: string, count?: number) => void;
}

const CART_KEY = "cart";
const CartContext = React.createContext({} as IContextCart);

const CartProvider = (props: any) => {
    const localCart = new Map<string, number>(getLocalData(CART_KEY));
    const [products] = useProducts();

    const [productQuantityMap, setState] = useState(localCart);

    const updateAndSave = () => {
        removeUnavailableProductFromCart(productQuantityMap, products);
        setState(new Map<string, number>(productQuantityMap));
        setLocalData(CART_KEY, Array.from(productQuantityMap.entries()));
    }

    const contextCart: IContextCart = {
        getCartQuantity: (id) => productQuantityMap.get(id),
        getAll: () => productQuantityMap.entries(),
        addToCart: (id, count) => {
            addToCart(productQuantityMap, id, count);
            updateAndSave();
        },
        removeAmountFromCart: (id, count) => {
            removeAmountFromCart(productQuantityMap, id, count);
            updateAndSave();
        }
    }
    return (
        <CartContext.Provider value={contextCart}>
            {props.children}
        </CartContext.Provider>
    );
}
export default CartProvider;

export const useCart = () => React.useContext(CartContext);