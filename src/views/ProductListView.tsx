import { Link } from "react-router-dom";
import Product from "../models/Product";
import ProductList from "../models/ProductList";
import "../css/ProductList.css"
import { getLocalData, regexPrice } from "../utils";
import { LoadState } from "../models/LoadingData";
import { getAll } from "../productService";
import React, { useEffect, useState } from "react";
import Cart from "../models/Cart";
import { useCart } from "../contexts/CartProvider";

//TODO
const LOCALSTORAGE_DATA_KEY = "product_list";

const ProductListView: React.FC = () => {
    const [status, setStatus] = useState(LoadState.LOADING);
    const [products, setProducts] = useState(getLocalData<ProductList>(LOCALSTORAGE_DATA_KEY));
    const cart = useCart();

    useEffect(() => {
        setStatus(LoadState.LOADING);

        getAll().then(res => {
            const plist = new ProductList();
            plist.push(...res.data);
            setProducts(plist);
            setStatus(LoadState.SUCCESS);
        }).catch(() => setStatus(LoadState.ERROR));
    }, []);

    const buyHandler = (ProductId: string) => {
        cart.addToCart(ProductId);
    }

    const renderProduct = (product: Product, cart: Cart) => {
        const errorPrice = !regexPrice.test(product.price);
        const priceDiv = errorPrice ? <div className="price">Error</div> : <div className="price">{(Number.parseInt(product.price) / 100).toFixed(2)} €</div>
        return (
            <div key={product.id} className="short-product">
                <h2 className="name"><Link to={`product/${product.id}`}>{product.name}</Link></h2>
                <p className="description">{product.desc}</p>
                <div>
                    {priceDiv}
                    <button onClick={() => buyHandler(product.id)}>Buy</button>
                    {cart.getProductQuantity(product.id)}
                </div>
            </div>
        );
    }

    return (
        <div id="product-list" className={status === LoadState.LOADING ? "loading" : ""} >
            {status === LoadState.LOADING ? <div>Loading...</div> : ""}
            {products?.map((product: Product) => renderProduct(product, cart))}
        </div>
    );
}
export default ProductListView;