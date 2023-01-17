import AuthProvider from './AuthProvider'
import CartProvider from './CartProvider'
import ProductsProvider from './ProductsProvider'

const AppProvider = (props: any): JSX.Element => {
    return (
        <AuthProvider>
            <ProductsProvider>
                <CartProvider>
                    {props.children}
                </CartProvider>
            </ProductsProvider>
        </AuthProvider>
    )
}
export default AppProvider
