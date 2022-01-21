import "../../css/CartEntry.css";
import React, { } from "react";
import { useProducts } from "../../contexts/ProductsProvider";
import { getProductById } from "../../models/ProductFunctions";
import ProductCartQuantity from "../shared/ProductCartQuantity";

type ComponentProps = {
    productId: string;
}

const CartEntry: React.FC<ComponentProps> = (props: ComponentProps) => {
    const [products] = useProducts();
    const product = getProductById(products, props.productId);

    if (!product) return null;

    return (
        <div key={props.productId} className="cart-entry">
            <div className="left">
                <div className="name">{product.name}</div>
                <div className="desc">{product.desc}</div>
            </div>
            <div className="right">
                <ProductCartQuantity productId={props.productId} />
            </div>
        </div>
    );
}
export default CartEntry;