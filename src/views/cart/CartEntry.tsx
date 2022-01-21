import React, { } from "react";
import { useCart } from "../../contexts/CartProvider";
import IProduct from "../../models/ProductFunctions";

interface ComponentProps {
    product: IProduct,
    quantity: number
}

const CartEntry: React.FC<ComponentProps> = (props: ComponentProps) => {
    const cart = useCart();

    return (
        <div key={props.product.id}>
            <div>
                {props.product.name}
            </div>
            <div>
                <button onClick={() => cart.addToCart(props.product.id)}>+</button>
                <div>{props.quantity}</div>
                <button onClick={() => cart.removeAmountFromCart(props.product.id)}>-</button>
            </div>
        </div>
    );
}
export default CartEntry;