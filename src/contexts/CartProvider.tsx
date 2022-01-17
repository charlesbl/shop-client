import React, { useState } from 'react';
import Cart, { CART_KEY } from '../models/Cart';
import { getLocalData } from '../utils';

const CartContext = React.createContext({} as Cart);

const CartProvider = (props: any) => {
    const productQuantityMap = getLocalData(CART_KEY);
    const localCart = new Cart(new Map<string, number>(productQuantityMap));

    const [cart, setState] = useState(localCart);
    cart.setDispatch(setState);
    return (
        <CartContext.Provider value={cart}>
            {props.children}
        </CartContext.Provider>
    );
}
export default CartProvider;

export const useCart = () => React.useContext(CartContext);