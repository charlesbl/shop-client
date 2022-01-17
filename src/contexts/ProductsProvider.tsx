import React, { useEffect, useState } from 'react';
import LoadState from '../models/LoadingState';
import { PRODUCTS_KEY } from '../models/Product';
import ProductList from '../models/ProductList';
import productService from '../productService';
import { getLocalData, setLocalData } from '../utils';

const ProductsContext = React.createContext({} as [ProductList, LoadState]);

const ProductsProvider = (props: any) => {
    let productList = getLocalData(PRODUCTS_KEY);
    if (!productList)
        productList = new ProductList();

    const [products, setProducts] = useState(productList);
    const [loadState, setLoadingState] = useState(LoadState.LOADING);

    useEffect(() => {
        setLoadingState(LoadState.LOADING);

        productService.getAll().then(res => {
            const plist = new ProductList(...res.data);
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
export const useProducts = () => {
    const [products, loadState] = React.useContext(ProductsContext);
    return [new ProductList(...products), loadState] as [ProductList, LoadState];
}

export default ProductsProvider;