import CartProps from "../components/CartProps";
import LoadingComponent from "../components/LoadingComponent";
import Product from "../shared/Product";

export default class ProductView extends LoadingComponent<Product, CartProps> {
    renderSuccess(p: Product) {
        return (
            <div>
                <div>{p.id} {p.name} {p.price}</div>
                <button onClick={() => this.props.onAddToCart(p.id)}>Add to cart</button>
            </div>
        );
    }
}