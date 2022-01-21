import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartProvider";
import { useProducts } from "../../contexts/ProductsProvider";
import LoadState from "../../models/LoadingState";
import Product from "../../models/Product";
import { formatProductPrice } from "../../models/ProductFunctions";

const ProductList: React.FC = () => {
    const cart = useCart();
    const [products, loadState] = useProducts();

    const buyHandler = (ProductId: string) => {
        return () => cart.addToCart(ProductId);
    }

    return (
        <div id="product-list" className={loadState === LoadState.LOADING ? "loading" : ""} >
            {loadState === LoadState.LOADING ? <div>Loading...</div> : ""}
            {products?.map((product: Product) => renderProduct(product, cart.getCartQuantity(product.id), buyHandler(product.id)))}
        </div>
    );
}


const renderProduct = (product: Product, quantityInCart: number | undefined, buyHandler: () => void) => {
    return (
        <div key={product.id} className="short-product">
            <h2 className="name"><Link to={`/product/${product.id}`}>{product.name}</Link></h2>
            <p className="description">{product.desc}</p>
            <div>
                <div className="price">{formatProductPrice(product.price)}</div>
                <button onClick={() => buyHandler()}>Buy</button>
                {quantityInCart}
            </div>
        </div>
    );
}

export default ProductList;