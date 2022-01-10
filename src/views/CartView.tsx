import React from "react";
import CartEntryComponent from "../components/CartEntryComponent";
import { useCart } from "../contexts/CartProvider";

const CartView: React.FC = () => {
    const cart = useCart();

    return (
        <div id="cart">
            <h1>
                Cart
            </h1>
            <div>{cart.getEntries().map(([productId, quantity]) => {
                return <CartEntryComponent key={(productId)} productId={productId} quantity={quantity} />
            })}</div>
        </div>
    );
}
export default CartView;