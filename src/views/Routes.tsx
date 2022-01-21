
import { Route, Routes } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsProvider';
import LoadState from '../models/LoadingState';
import Cart from './cart/Cart';
import Home from './Home';
import NotFound from './NotFound';
import Product from './products/Product';
import ProductAdd from './products/ProductAdd';
import ProductList from './products/ProductList';

export const RoutesDiv = () => {
    const [, , loadState] = useProducts();


    switch (loadState) {
        case LoadState.LOADING:
            return <div>Loading...</div>;
        case LoadState.ERROR:
            return <div>Error</div>;
        case LoadState.SUCCESS:
            return (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/product/:productId" element={<Product />} />
                    <Route path="/addproduct/" element={<ProductAdd />} />
                    <Route path="/cart/" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            );
    }
}