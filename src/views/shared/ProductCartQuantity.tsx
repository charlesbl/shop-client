import { useCart } from '../../contexts/CartProvider'
import '../../css/ProductCartQuantity.css'

interface ProductCartQuantityProps {
    productId: string
}

const ProductCartQuantity: React.FC<ProductCartQuantityProps> = (props: ProductCartQuantityProps): JSX.Element => {
    const cart = useCart()

    return (
        <div className="cart-quantity">
            <button onClick={() => cart.addToCart(props.productId)}>
                +
            </button>

            <div>
                {cart.getCartQuantity(props.productId) ?? 0}
            </div>

            <button onClick={() => cart.removeAmountFromCart(props.productId)}>
                -
            </button>
        </div>
    )
}
export default ProductCartQuantity
