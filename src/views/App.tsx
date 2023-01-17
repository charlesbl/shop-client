import '../css/App.css'
import { Link, Route, Routes } from 'react-router-dom'
import AppProvider from '../contexts/AppProvider'
import Cart from './cart/Cart'
import Home from './Home'
import NotFound from './NotFound'
import Product from './products/Product'
import ProductAdd from './products/ProductAdd'
import ProductList from './products/ProductList'
import Login from './Login'
import ProtectedRoute from './shared/ProtectedRoute'
import { useIsLogged } from '../contexts/AuthProvider'
import Logout from './Logout'

const NavBar: React.FC = (): JSX.Element => {
    const isLogged = useIsLogged()
    return (
        <nav>
            <Link to="/">
                Home
            </Link>

            <Link to="/products">
                Products
            </Link>

            {isLogged && (
                <Link to="/addproduct">
                    Add Product
                </Link>
            )}

            <Link to="/cart">
                Cart
            </Link>

            {isLogged
                ? (
                    <Link to="/logout">
                        Logout
                    </Link>
                )
                : (
                    <Link to="/login">
                        Login
                    </Link>
                )}
        </nav>
    )
}

const App = (): JSX.Element => {
    return (
        <AppProvider>
            <div>
                <header>
                    <NavBar />
                </header>

                <div id="main">
                    <Routes>
                        <Route
                            element={<Home />}
                            path="/" />

                        <Route
                            element={<ProductList />}
                            path="/products" />

                        <Route
                            element={<Product />}
                            path="/product/:productId" />

                        <Route
                            element={<Cart />}
                            path="/cart/" />

                        <Route
                            element={<Login />}
                            path="/login/" />

                        <Route
                            element={<Logout />}
                            path="/logout/" />

                        <Route
                            element={<NotFound />}
                            path="*" />

                        <Route element={<ProtectedRoute />}>
                            <Route
                                element={<ProductAdd />}
                                path="/addproduct/" />
                        </Route>
                    </Routes>
                </div >
            </div >
        </AppProvider>
    )
}
export default App
