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
        <div key={props.productId}>
            <div>
                {product.name}
            </div>
            <ProductCartQuantity productId={props.productId} />
        </div>
    );
}
export default CartEntry;