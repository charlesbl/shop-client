import { Link } from "react-router-dom";
import Product from "../shared/Product";
import ProductList from "./ProductList";
import LoadingComponent from "../components/LoadingComponent";
import "../css/ProductList.css"

export default class ProductListView extends LoadingComponent<ProductList> {
    renderProduct(product: Product) {
        return (
            <div key={product.id} className="short-product">
                <h2 className="name"><Link to={"/products/" + product.id}>{product.name}</Link></h2>
                <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempus, ipsum ut tempor porttitor, sapien arcu ullamcorper velit, quis lobortis sem ligula ut enim. In hac habitasse platea dictumst. Vivamus placerat elit id vulputate bibendum. Nunc cursus dolor nec nibh scelerisque, non sodales lacus cursus. Suspendisse quis dapibus risus, et ultrices risus.</p>
                <div>
                    <div className="price">{(Number.parseInt(product.price) / 100).toFixed(2)} €</div>
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