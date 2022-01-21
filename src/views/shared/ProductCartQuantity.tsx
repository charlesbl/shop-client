import { useCart } from "../../contexts/CartProvider";

type ComponentProps = {
    productId: string;
}

const ProductCartQuantity = (props: ComponentProps) => {
    const cart = useCart();

    return (
        <div>
            <button onClick={() => cart.addToCart(props.productId)}>+</button>
            <div>{cart.getCartQuantity(props.productId) ?? 0}</div>
            <button onClick={() => cart.removeAmountFromCart(props.productId)}>-</button>
        </div>
    );
}
export default ProductCartQuantity;