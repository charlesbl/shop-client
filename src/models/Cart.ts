import { getProductById, Product } from './ProductFunctions'

type CartMap = Map<string, number>

export const addToCart = (cart: CartMap, id: string, count = 1): CartMap => cart.set(id, (cart.get(id) ?? 0) + count)

/** Remove a limited quantity of a Product */
export const removeAmountFromCart = (cart: CartMap, id: string, count = 1): void => {
    const currentQuantity = cart.get(id)
    if (currentQuantity === undefined) return

    const newQuantity = currentQuantity - count
    if (newQuantity <= 0) {
        cart.delete(id)
    } else {
        cart.set(id, newQuantity)
    }
}

export const removeUnavailableProductFromCart = (cart: CartMap, productList: Product[]): void =>
    Array.from(cart.keys())
        .filter((productId) => getProductById(productList, productId) == null)
        .forEach((productId) => cart.delete(productId))

export const getTotalProduct = (cart: CartMap): number => Array.from(cart.values()).reduce((sum, current) => sum + current, 0)
