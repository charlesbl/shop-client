export interface Product {
    readonly _id: string
    readonly name: string
    readonly desc: string
    readonly price: string
}
export interface ICreateProduct {
    readonly name: string
    readonly desc: string
    readonly price: string
}

export const isValidProduct = (product: Product): boolean => /^\d*$/.test(product.price)
export const formatProductPrice = (price: string): string => `${(Number.parseInt(price) / 100).toFixed(2)} €`
export const getProductById = (productList: Product[], id: string): Product | undefined => productList.find(p => p._id === id)
