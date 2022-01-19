import React from "react";
import CartEntryComponent from "../components/CartEntryComponent";
import { useCart } from "../contexts/CartProvider";

const CartView: React.FC = () => {
    const cartContext = useCart();

    const entriesList = Array.from(cartContext.cart.entries(), ([productId, quantity]) => {
        return <CartEntryComponent key={(productId)} productId={productId} quantity={quantity} />
    });

    return (
        <div id="cart">
            <h1>
                Cart
            </h1>
            <div>{entriesList}</div>
        </div>
    );
}
export default CartView;