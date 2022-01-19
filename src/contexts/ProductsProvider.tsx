import React, { useEffect, useState } from 'react';
import LoadState from '../models/LoadingState';
import Product, { PRODUCTS_KEY } from '../models/Product';
import productService from '../productService';
import { getLocalData, setLocalData } from '../utils';

const ProductsContext = React.createContext({} as [Array<Product>, LoadState]);

const ProductsProvider = (props: any) => {
    const productList = getLocalData(PRODUCTS_KEY) ?? [];

    const [products, setProducts] = useState(productList);
    const [loadState, setLoadingState] = useState(LoadState.LOADING);

    useEffect(() => {
        setLoadingState(LoadState.LOADING);

        productService.getAll().then(res => {
            const plist = new Array<Product>(...res.data);
            setProducts(plist);
            setLoadingState(LoadState.SUCCESS);
            setLocalData(PRODUCTS_KEY, plist);
        }).catch(() => setLoadingState(LoadState.ERROR));
    }, []);

    return (
        <ProductsContext.Provider value={[products, loadState]}>
            {props.children}
        </ProductsContext.Provider>
    );
}
export const useProducts = () => React.useContext(ProductsContext);

export default ProductsProvider;