import React, { useState } from 'react';
import Cart from '../models/Cart';
import { CART_KEY, getLocalData } from '../utils';

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
export const useCart = () => React.useContext(CartContext);

export default CartProvider;