import React, { useEffect, useState } from 'react'
import LoadState from '../models/LoadingState'
import { IProduct, isValidProduct, PRODUCTS_KEY } from '../models/ProductFunctions'
import productService from '../services/product.service'
import { getLocalData, setLocalData } from '../utils'

type ProductsProviderStates = [IProduct[], LoadState, () => void]
const ProductsContext = React.createContext<ProductsProviderStates>([[], LoadState.LOADING, () => {}])

const ProductsProvider = (props: any): JSX.Element => {
    const productList = getLocalData(PRODUCTS_KEY) ?? []

    const [products, setProducts] = useState(productList)
    const [loadState, setLoadingState] = useState(LoadState.LOADING)

    const updateProducts = (): void => {
        setLoadingState(LoadState.LOADING)

        productService.getAll().then(res => {
            const plist = res.data.filter((product) => isValidProduct(product))
            setProducts(plist)
            setLoadingState(LoadState.SUCCESS)
            setLocalData(PRODUCTS_KEY, plist)
        }).catch(() => setLoadingState(LoadState.ERROR))
    }

    useEffect(() => {
        updateProducts()
    }, [])

    return (
        <ProductsContext.Provider value={[products, loadState, updateProducts]}>
            {props.children}
        </ProductsContext.Provider>
    )
}
export const useProducts = (): ProductsProviderStates => React.useContext(ProductsContext)

export default ProductsProvider
