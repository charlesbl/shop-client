import { Link } from "react-router-dom";
import Product from "../models/Product";
import ProductList from "../models/ProductList";
import LoadingComponent from "../components/LoadingComponent";
import "../css/ProductList.css"
import CartProps from "../models/CartProps";
import { regexPrice } from "../utils";

export default class ProductListView extends LoadingComponent<ProductList, CartProps, any> {
    renderProduct(product: Product) {
        const errorPrice: boolean = !regexPrice.test(product.price);
        const priceDiv = errorPrice ? <div className="price">Error</div> : <div className="price">{(Number.parseInt(product.price) / 100).toFixed(2)} €</div>
        return (
            <div key={product.id} className="short-product">
                <h2 className="name"><Link to={"/product/" + product.id}>{product.name}</Link></h2>
                <p className="description">{product.desc}</p>
                <div>
                    {priceDiv}
                    <button>Buy</button>
                </div>
            </div>
        );
    }

    renderSuccess(products: ProductList) {
        return (
            <div id="product-list">
                {products.map((product: Product) => this.renderProduct(product))}
            </div>
        );
    }
}