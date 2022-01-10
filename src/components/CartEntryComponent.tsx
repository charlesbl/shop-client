import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartProvider";
import LoadState from "../models/LoadingState";
import Product from "../models/Product";
import productService from "../productService";
import { useIsMounted, setLocalData, getLocalData } from "../utils";

interface ComponentProps {
    productId: string,
    quantity: number
}
const LOCALSTORAGE_DATA_KEY = "product";

const CartEntryComponent: React.FC<ComponentProps> = (props: ComponentProps) => {
    const isMounted = useIsMounted();
    const [loadingState, setLoadingState] = useState(LoadState.LOADING);
    const [product, setProduct] = useState(getLocalData<Product>(LOCALSTORAGE_DATA_KEY + props.productId));
    const cart = useCart();

    useEffect(() => {
        setLoadingState(LoadState.LOADING);
        productService.getById(props.productId).then(res => {
            setLocalData(LOCALSTORAGE_DATA_KEY + props.productId, res.data);
            if (!isMounted.current)
                return;
            setProduct(res.data);
            setLoadingState(LoadState.SUCCESS);
        }).catch(() => setLoadingState(LoadState.ERROR));
    }, [isMounted, props.productId]);

    return (
        <div key={props.productId}>
            <div>
                {loadingState === LoadState.SUCCESS ? product?.name : props.productId}
            </div>
            <div>
                <button onClick={() => cart.removeAmountFromCart(props.productId)}>-</button>
                <div>{props.quantity}</div>
                <button onClick={() => cart.addToCart(props.productId)}>+</button>
            </div>
        </div>
    );
}
export default CartEntryComponent;