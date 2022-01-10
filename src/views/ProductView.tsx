import Product from "../models/Product";
import { Navigate, useParams } from "react-router-dom";
import LoadState from "../models/LoadingState";
import React, { useEffect, useState } from "react";
import { getLocalData, setLocalData, useIsMounted } from "../utils";
import productService from "../productService";


const LOCALSTORAGE_DATA_KEY = "product";

enum DISPLAY_STATES {
    DISPLAY,
    REMOVING,
    REMOVED,
    REDIRECT
}

interface ComponentParams {
    productId: string;
}

const ProductView: React.FC = () => {
    const { productId } = useParams<keyof ComponentParams>() as ComponentParams;
    const [loadingState, setLoadingState] = useState(LoadState.LOADING);
    const [displayState, setDisplayState] = useState(DISPLAY_STATES.DISPLAY);
    const [product, setProduct] = useState(getLocalData<Product>(LOCALSTORAGE_DATA_KEY + productId));

    const isMounted = useIsMounted();

    useEffect(() => {
        setLoadingState(LoadState.LOADING);
        productService.getById(productId).then(res => {
            setLocalData(LOCALSTORAGE_DATA_KEY + productId, res.data);
            if (!isMounted.current)
                return;
            setProduct(res.data);
            setLoadingState(LoadState.SUCCESS);
        }).catch(() => setLoadingState(LoadState.ERROR));
    }, [isMounted, productId]);

    function removeProduct() {
        if (!product) {
            return;
        }
        productService.remove(product.id).then((res) => {
            setDisplayState(DISPLAY_STATES.REMOVED);
            setTimeout(async () => {
                setDisplayState(DISPLAY_STATES.REDIRECT);
            }, 1000);
        });
    }

    if (displayState === DISPLAY_STATES.REDIRECT) {
        return (
            <Navigate to="/products" />
        );
    }
    if (displayState === DISPLAY_STATES.REMOVED) {
        return (
            <div>Removed</div>
        );
    }
    if (displayState === DISPLAY_STATES.REMOVING) {
        return (
            <div>Removing...</div>
        );
    }

    const ProductDiv = product ?
        <div>
            <div>{product.id} {product.name} {product.desc} {product.price}</div>
            {/* <button onClick={() => this.props.getCart().addToCart(p.id)}>Add to cart</button> */}
            <button onClick={removeProduct} disabled={loadingState !== LoadState.SUCCESS}>Remove from database</button>
        </div> : undefined;

    return (
        <div>
            {loadingState === LoadState.LOADING ? <div>Loading...</div> : ""}
            {loadingState === LoadState.ERROR ? <div>Error</div> : ""}
            {ProductDiv}
        </div>
    );
}
export default ProductView;