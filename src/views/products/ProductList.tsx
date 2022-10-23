import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartProvider";
import { useProducts } from "../../contexts/ProductsProvider";
import { formatProductPrice, IProduct } from "../../models/ProductFunctions";
import ProductCartQuantity from "../shared/ProductCartQuantity";

const ProductList: React.FC = () => {
    const cart = useCart();
    const [products] = useProducts();

    const addProductDiv = (pid: string) => {
        if (cart.getCartQuantity(pid))
            return <ProductCartQuantity productId={pid} />
        else
            return <button onClick={() => cart.addToCart(pid)}>Add to cart</button>
    }

    const renderProduct = (product: IProduct) => {
        return (
            <div key={product.id} className="short-product">
                <h2 className="name"><Link to={`/product/${product.id}`}>{product.name}</Link></h2>
                <p className="description">{product.desc}</p>
                <div className="price-and-buy">
                    <div className="price">{formatProductPrice(product.price)}</div>
                    <div className="buy">{addProductDiv(product.id)}</div>
                </div>
            </div>
        );
    }

    return (
        <div id="product-list">
            {products?.map((product: IProduct) => renderProduct(product))}
        </div>
    );
}

export default ProductList;