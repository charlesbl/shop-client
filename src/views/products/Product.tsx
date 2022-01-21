import { Navigate, useParams } from "react-router-dom";
import LoadState from "../../models/LoadingState";
import React, { useEffect, useState } from "react";
import productService from "../../productService";
import { useProducts } from "../../contexts/ProductsProvider";
import { useCart } from "../../contexts/CartProvider";
import { formatProductPrice } from "../../models/Product";
import { getProductById } from "../../models/ProductList";
import { useIsMounted } from "../../utils";

enum DisplayStates {
    DISPLAY,
    ERROR,
    REMOVING,
    REMOVED,
    REDIRECT
}

type ComponentParams = {
    productId: string;
}

const ProductView: React.FC = () => {
    const { productId } = useParams<ComponentParams>();
    const [displayState, setDisplayState] = useState(DisplayStates.DISPLAY);
    const [products, loadState, updateProducts] = useProducts();
    const cart = useCart();
    const isMounted = useIsMounted();

    const product = productId ? getProductById(products, productId) : undefined;

    useEffect(() => {
        if (!productId) {
            setDisplayState(DisplayStates.ERROR);
            return;
        }
    }, [productId]);

    const removeProduct = () => {
        if (!product) {
            return;
        }
        setDisplayState(DisplayStates.REMOVING);
        productService.remove(product.id).then(() => {
            updateProducts();
            if (!isMounted.current) return;
            setDisplayState(DisplayStates.REMOVED);
            setTimeout(async () => {
                if (!isMounted.current) return;
                setDisplayState(DisplayStates.REDIRECT);
            }, 500);
        });
    }

    const productDiv = () => {
        return product ? (
            <div>
                <div>{product.id}</div>
                <div>{product.name}</div>
                <div>{product.desc}</div>
                <div>{formatProductPrice(product.price)} €</div>
                <div>
                    <button onClick={() => cart.addToCart(product.id)}>Add to cart</button>
                    <div>{cart.getCartQuantity(product.id)}</div>
                </div>
                <div>
                    <button onClick={removeProduct} disabled={loadState !== LoadState.SUCCESS}>Remove from database</button>
                </div>
            </div>
        ) : undefined;
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
            {loadingDiv() ?? displayDiv()}
        </div>
    );
}
export default ProductView;