import CartProvider from "./CartProvider";
import ProductsProvider from "./ProductsProvider";

const AppProvider = (props: any) => {
    return (
        <ProductsProvider>
            <CartProvider>
                {props.children}
            </CartProvider>
        </ProductsProvider>
    );
}
export default AppProvider;