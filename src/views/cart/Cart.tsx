import React from 'react'
import CartEntry from './CartEntry'
import { useCart } from '../../contexts/CartProvider'

const Cart: React.FC = () => {
    const cart = useCart()

    const entriesList = cart.getAll().map(([productId]) => {
        return (
            <CartEntry
                key={(productId)}
                productId={productId}
            />
        )
    })

    return (
        <div id="cart">
            <h1>
                Cart
            </h1>

            <div>
                {entriesList.length > 0 ? entriesList : 'Cart Empty'}
            </div>
        </div>
    )
}
export default Cart
