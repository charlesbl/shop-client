import { Link } from "react-router-dom";
import Product from "../shared/Product";
import LoadingComponent from "./LoadingComponent";
import ProductList from "./ProductList";

export default class ProductListView extends LoadingComponent<ProductList> {
    renderProduct(product: Product) {
        return (
            <div key={product.id}>
                <div>{product.name}</div>
                <Link to={"/products/" + product.id}>Details</Link>
            </div>
        );
    }

    renderSuccess(products: ProductList) {
        return (
            <div>
                {products.map((product: Product) => this.renderProduct(product))}
            </div>
        );
    }
}