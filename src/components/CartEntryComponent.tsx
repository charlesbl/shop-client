import React, { } from "react";
import { useCart } from "../contexts/CartProvider";
import { useProducts } from "../contexts/ProductsProvider";
import LoadState from "../models/LoadingState";
import { getProductById } from "../models/ProductList";

interface ComponentProps {
    productId: string,
    quantity: number
}

const CartEntryComponent: React.FC<ComponentProps> = (props: ComponentProps) => {
    const cart = useCart();
    const [products, loadingState] = useProducts();
    const product = getProductById(products, props.productId);

    return (
        <div key={props.productId} className={loadingState === LoadState.LOADING ? "loading" : ""}>
            <div>
                {product === undefined ? props.productId : product.name}
            </div>
            <div>
                <button onClick={() => cart.addToCart(props.productId)}>+</button>
                <div>{props.quantity}</div>
                <button onClick={() => cart.removeAmountFromCart(props.productId)}>-</button>
            </div>
        </div>
    );
}
export default CartEntryComponent;