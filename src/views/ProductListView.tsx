import { Link } from "react-router-dom";
import Product, { formatProductPrice, regexPrice } from "../models/Product";
import "../css/ProductList.css";
import LoadState from "../models/LoadingState";
import React from "react";
import { useCart } from "../contexts/CartProvider";
import { useProducts } from "../contexts/ProductsProvider";

const ProductListView: React.FC = () => {
    const cartContext = useCart();
    const [products, loadState] = useProducts();

    const buyHandler = (ProductId: string) => {
        return () => cartContext.addToCart(ProductId);
    }

    return (
        <div id="product-list" className={loadState === LoadState.LOADING ? "loading" : ""} >
            {loadState === LoadState.LOADING ? <div>Loading...</div> : ""}
            {products?.map((product: Product) => renderProduct(product, cartContext.cart.get(product.id), buyHandler(product.id)))}
        </div>
    );
}


const renderProduct = (product: Product, quantityInCart: number | undefined, buyHandler: () => void) => {
    const errorPrice = !regexPrice.test(product.price);
    const priceDiv = errorPrice ? <div className="price">Error</div> : <div className="price">{formatProductPrice(product.price)} €</div>
    return (
        <div key={product.id} className="short-product">
            <h2 className="name"><Link to={`/product/${product.id}`}>{product.name}</Link></h2>
            <p className="description">{product.desc}</p>
            <div>
                {priceDiv}
                <button onClick={() => buyHandler()}>Buy</button>
                {quantityInCart}
            </div>
        </div>
    );
}

export default ProductListView;