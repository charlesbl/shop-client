import React, { PropsWithChildren, useState } from 'react'
import { addToCart, removeAmountFromCart, removeUnavailableProductFromCart } from '../models/Cart'
import { getLocalData, setLocalData } from '../utils'
import { useProducts } from './ProductsProvider'

interface CartProviderStates {
    getCartQuantity: (id: string) => number | undefined
    getAll: () => Array<[string, number]>
    addToCart: (id: string, count?: number) => void
    removeAmountFromCart: (id: string, count?: number) => void
}

const CART_KEY = 'cart'
const CartContext = React.createContext<CartProviderStates>({
    getCartQuantity: () => undefined,
    getAll: () => [],
    addToCart: () => {},
    removeAmountFromCart: () => {}
})

const CartProvider: React.FC<PropsWithChildren> = (props: PropsWithChildren): JSX.Element => {
    const localCart = new Map<string, number>(getLocalData(CART_KEY))
    const [products] = useProducts()

    const [productQuantityMap, setState] = useState(localCart)

    const updateAndSave = (): void => {
        removeUnavailableProductFromCart(productQuantityMap, products)
        setState(new Map<string, number>(productQuantityMap))
        setLocalData(CART_KEY, Array.from(productQuantityMap.entries()))
    }

    const contextCart: CartProviderStates = {
        getCartQuantity: (id) => productQuantityMap.get(id),
        getAll: () => Array.from(productQuantityMap.entries()),
        addToCart: (id, count) => {
            addToCart(productQuantityMap, id, count)
            updateAndSave()
        },
        removeAmountFromCart: (id, count) => {
            removeAmountFromCart(productQuantityMap, id, count)
            updateAndSave()
        }
    }
    return (
        <CartContext.Provider value={contextCart}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartProvider

export const useCart = (): CartProviderStates => React.useContext(CartContext)
