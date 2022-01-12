import Product from "../models/Product";
import { Navigate, useParams } from "react-router-dom";
import LoadState from "../models/LoadingState";
import React, { useEffect, useState } from "react";
import { useIsMounted } from "../utils";
import productService from "../productService";
import { useProducts } from "../contexts/ProductsProvider";
import { useCart } from "../contexts/CartProvider";
import ProductList from "../models/ProductList";

enum DisplayStates {
    DISPLAY,
    ERROR,
    REMOVING,
    REMOVED,
    REDIRECT
}

type ComponentParams = {
    productId: string;
    productIds: string;
}

const ProductView: React.FC = () => {
    const { productId } = useParams<ComponentParams>();
    const [displayState, setDisplayState] = useState(DisplayStates.DISPLAY);
    const [products, loadState] = useProducts();
    const cart = useCart();

    const product = productId ? products.getProductById(productId) : undefined;

    useEffect(() => {
        if (!productId) {
            setDisplayState(DisplayStates.ERROR);
            return;
        }
    }, [productId]);

    function removeProduct() {
        if (!product) {
            return;
        }
        setDisplayState(DisplayStates.REMOVING);
        productService.remove(product.id).then((res) => {
            setDisplayState(DisplayStates.REMOVED);
            setTimeout(async () => {
                setDisplayState(DisplayStates.REDIRECT);
            }, 1000);
        });
    }

    const productDiv = () => {
        if (product)
            return <div>
                <div>{product.id} {product.name} {product.desc} {product.price}</div>
                <button onClick={() => cart.addToCart(product.id)}>Add to cart</button>
                <button onClick={removeProduct} disabled={loadState !== LoadState.SUCCESS}>Remove from database</button>
            </div>;
        return undefined
    }

    const displayDiv = () => {
        switch (displayState) {
            case DisplayStates.DISPLAY:
                return productDiv();
            case DisplayStates.ERROR:
                return <div>Removing error...</div>;
            case DisplayStates.REMOVING:
                return <div>Removing...</div>;
            case DisplayStates.REMOVED:
                return <div>Removed</div>;
            case DisplayStates.REDIRECT:
                return <Navigate to="/products" />;
        }
    }

    const loadingDiv = () => {
        switch (loadState) {
            case LoadState.LOADING:
                return <div>Loading...</div>;
            case LoadState.ERROR:
                return <div>Error</div>;
            case LoadState.SUCCESS:
                return undefined;
        }
    }

    return (
        <div>
            {loadingDiv()}
            {displayDiv()}
        </div>
    );
}
export default ProductView;