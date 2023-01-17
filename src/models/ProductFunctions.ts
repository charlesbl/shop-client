export const PRODUCTS_KEY = 'products'

export interface IProduct {
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

export const isValidProduct = (product: IProduct): boolean => /^\d*$/.test(product.price)
export const formatProductPrice = (price: string): string => `${(Number.parseInt(price) / 100).toFixed(2)} €`
export const getProductById = (productList: IProduct[], id: string): IProduct | undefined => productList.find(p => p._id === id)
