import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartProvider";
import LoadState from "../models/LoadingState";
import Product from "../models/Product";
import productService from "../productService";
import { useIsMounted } from "../utils";

interface ComponentProps {
    productId: string,
    quantity: number
}

const CartEntryComponent: React.FC<ComponentProps> = (props: ComponentProps) => {
    const isMounted = useIsMounted();
    const [loadingState, setLoadingState] = useState(LoadState.LOADING);
    const [product, setProduct] = useState<Product>();
    const cart = useCart();

    useEffect(() => {
        setLoadingState(LoadState.LOADING);
        productService.getById(props.productId).then(res => {
            if (!isMounted.current)
                return;
            setProduct(res.data);
            setLoadingState(LoadState.SUCCESS);
        }).catch(() => setLoadingState(LoadState.ERROR));
    }, [isMounted, props.productId]);

    return (
        <div key={props.productId} className={loadingState === LoadState.LOADING ? "loading" : ""}>
            <div>
                {product === undefined ? props.productId : product.name}
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