import React, { useState } from 'react';
import { addToCart, Cart, removeAmountFromCart } from '../models/Cart';
import { getLocalData, setLocalData } from '../utils';

interface IContextCart {
    cart: Cart;
    addToCart: (id: string, count?: number) => void;
    removeAmountFromCart: (id: string, count?: number) => void;
}

const CART_KEY = "cart";
const CartContext = React.createContext({} as IContextCart);

const CartProvider = (props: any) => {
    const localCart = new Map<string, number>(getLocalData(CART_KEY));

    const [cart, setState] = useState(localCart);

    const updateAndSaveState = () => {
        setState(new Map<string, number>(cart));
        setLocalData(CART_KEY, Array.from(cart.entries()));
    }

    const contextCart: IContextCart = {
        cart: cart,
        addToCart: (id, count) => {
            addToCart(cart, id, count);
            updateAndSaveState();
        },
        removeAmountFromCart: (id, count) => {
            removeAmountFromCart(cart, id, count);
            updateAndSaveState();
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