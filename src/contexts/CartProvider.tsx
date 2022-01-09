import React, { useState } from 'react';
import Cart from '../models/Cart';

const CartContext = React.createContext({} as Cart);

const CartProvider = (props: any) => {
    const [cart, setState] = useState(new Cart());
    cart.setDispatch(setState);

    return (
        <CartContext.Provider value={cart}>
            {props.children}
        </CartContext.Provider>
    );
}
export const useCart = () => React.useContext(CartContext);

export default CartProvider;