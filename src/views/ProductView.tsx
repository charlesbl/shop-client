import Product from "../shared/Product";
import LoadingComponent from "./LoadingComponent";

interface ProductProps {
    onAddToCart: (id: string) => void;
}

export default class ProductView extends LoadingComponent<Product, ProductProps> {
    renderSuccess(p: Product) {
        return (
            <div>
                <div>{p.id} {p.name} {p.price}</div>
                <button onClick={() => this.props.onAddToCart(p.id)}>Add to cart</button>
            </div>
        );
    }
}