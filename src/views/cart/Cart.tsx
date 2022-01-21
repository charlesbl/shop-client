import React from "react";
import CartEntry from "./CartEntry";
import { useCart } from "../../contexts/CartProvider";
import { useProducts } from "../../contexts/ProductsProvider";
import { getProductById } from "../../models/ProductFunctions";

const Cart: React.FC = () => {
    const cart = useCart();
    const [products] = useProducts();

    const entriesList = Array.from(cart.getAll(), ([productId, quantity]) => {
        const product = getProductById(products, productId);
        return product ? <CartEntry key={(productId)} product={product} quantity={quantity} /> : undefined
    });

    return (
        <div id="cart">
            <h1>
                Cart
            </h1>
            <div>{entriesList.length > 0 ? entriesList : "Cart Empty"}</div>
        </div>
    );
}
export default Cart;