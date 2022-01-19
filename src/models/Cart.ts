import ProductList from '../models/ProductList';

export type Cart = Map<string, number>;

export const addToCart = (cart: Cart, id: string, count = 1) => cart.set(id, (cart.get(id) ?? 0) + count);

/** Remove a limited quantity of a Product */
export const removeAmountFromCart = (cart: Cart, id: string, count = 1) => {
    const currentQuantity = cart.get(id);
    if (!currentQuantity) return;

    const newQuantity = currentQuantity - count;
    if (newQuantity <= 0) {
        cart.delete(id);
    } else {
        cart.set(id, newQuantity);
    }
}

export const removeUnavailableProductFromCart = (cart: Cart, productList: ProductList) =>
    Array.from(cart.keys())
        .filter((productId) => !productList.getProductById(productId))
        .forEach((productId) => cart.delete(productId));

export const getTotalProduct = (cart: Cart) => Array.from(cart.values()).reduce((sum, current) => sum + current, 0);